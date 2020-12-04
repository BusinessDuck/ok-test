/**
 * Component Manager
 * @class
 * @classdesc component manager provide component mount statement callbacks
 * e.g. onComponentMount(), onComponentUpdate(), onComponentUnMount()
 * Singleton instance!
 */
export class ComponentManager {

  /**
   * Constructor
   */
  constructor() {
    this.componentsMap = {};
  }

  /**
   * Create instance and create DOM observer for detect operations with nodes inside of App
   * track DOM changes in appId container
   * @param appId
   */
  bootstrap(appId) {
    this._mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        this._handleLifecycle(mutation.target, mutation.addedNodes);
        this._handleUnMount(mutation.removedNodes);
      });
    });

    this._mutationObserver.observe(document.getElementById(appId), {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true
    });
  }

  /**
   * Add component id (hash) to component instance Map
   * @param componentObject
   */
  register(componentObject) {
    this.componentsMap[componentObject.hash] = componentObject;
  }

  /**
   * Remove component instance from Map
   * @param componentHash
   */
  unRegister(componentHash) {
    delete this.componentsMap[componentHash];
  }

  /**
   * Track components lifecycle by parsing dom node changes
   * Recursive call when components was found inside of current
   * Track lifecycle for all components deep
   * @param {Node} target
   * @param {NodeList} nodes
   * @param {boolean} inherit
   * @private
   */
  _handleLifecycle(target, nodes, inherit = false) {
    Array.prototype.slice.call(nodes).forEach(node => {
      if (node.id && this.componentsMap[node.id]) {
        if (target.id === node.id) {
          this.componentsMap[node.id].onComponentUpdate(node);
        } else {
          this.componentsMap[node.id].onComponentMount(node);
        }
        const childNodes = node.querySelectorAll("[id]");
        if (childNodes.length > 0 && !inherit) {
          this._handleLifecycle(target, childNodes, true);
        }
      }
    });
  }

  /**
   * Detect node remove events and execute onComponentUnMount callback
   * @param nodes
   * @private
   */
  _handleUnMount(nodes) {
    Array.prototype.slice.call(nodes).forEach(node => {
      if (node.id && this.componentsMap[node.id]) {
        this.componentsMap[node.id].onComponentUnMount();
        this.unRegister(node.id);
      }
    });
  }

  /**
   * Return component instance by hash (component id in DOM)
   * @param hash
   * @return {Component}
   */
  getComponentInstance(hash) {
    return this.componentsMap[hash];
  }

  /**
   * Return component controller instance by hash
   * @param hash
   * @return {Controller}
   */
  getComponentController(hash) {
    const componentInstance = this.getComponentInstance(hash);
    if (componentInstance) {
      return componentInstance.controller;
    }

    throw new Error("Component instance not found by hash code");
  }

  /**
   * Disconnect from DOM mutation observer
   */
  disconnect() {
    this._mutationObserver.disconnect();
  }
}

const componentManager = new ComponentManager();

export {
  componentManager
};
