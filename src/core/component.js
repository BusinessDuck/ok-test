import { componentManager } from "./componentManager";

/**
 * Component
 * @class
 * @classdesc Base component prototype
 * @example
 * import { Component } from "core";
 * MyComponent extends Component ...
 */
export class Component {

  /**
   * Constructor
   * Generate component hash and register component in manager's map
   */
  constructor() {
    this.updateHash();
    componentManager.register(this);
  }

  /**
   * Generate new random hash id for component
   */
  updateHash() {
    this.hash = [...new Array(2)].map(() => Math.random().toString(36).slice(5)).join("");
  }

  /**
   * Lifecycle callback
   */
  onComponentMount() {
  }

  /**
   * Lifecycle callback
   */
  onComponentUnMount() {
  }

  /**
   * Lifecycle callback
   */
  onComponentUpdate() {
  }

  /**
   * Component render function
   * @return {string}
   * @warning Be careful with line endings in template literals
   * @example Regular
   * e.g. `<div></div> \n <div></div> \n` if you don't want to use check below
   *
   * @example Valid
   * html`
   * <div></div>
   * <div></div>
   * `;
   *
   */
  render() {
    return "";
  }

}
