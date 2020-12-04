import { eventPath } from "./utils/eventPathPolyfill";

/**
 * Base controller class
 * @class
 * @classdesc base prototype of all controllers
 * @example
 * import { Controller } from "core";
 * MyController extends Controller
 **/
export class Controller {

  /**
   * Constructor
   * @desc Function params component expected, import component prototype from "core"
   * @param component
   */
  constructor(component) {
    this.component = component;
    this.listenersBubbling = {};
    this.listenersCapturing = {};
  }

  /** Check for event.target or event.path elements contain class target
   * @private
   * @param {Event} event
   * @param {string} target
   * @return {boolean}
   */
  _isEventMatch = (event, target) => {
    const path = eventPath(event);
    return event.target.classList.contains(target) ||
      (path && Array.prototype.slice.call(path).filter((node => node.classList && node.classList.contains(target))).length);
  };

  /**
   * Connect DOM element with controller instance after rendering
   * @param node
   * @constructor
   */
  DOMConnect(node) {
    this.node = node;
  }

  /**
   * Add component root listener for tracking all fired events inside of component
   * @private
   * @param {string} type
   * @param {boolean} useCapture
   */
  _initRootListener = (type, useCapture) => {
    this.node.addEventListener(type, this._eventHandler, useCapture);
  };

  /**
   * Handle event and execute callbacks for current event type
   * @private
   * @param {Event} event
   */
  _eventHandler = (event) => {
    let listeners = event.eventPhase === Event.CAPTURING_PHASE ? this.listenersCapturing : this.listenersBubbling;

    if (listeners[event.type]) {
      listeners[event.type].forEach(({ target, callback }) => {
        if (this._isEventMatch(event, target)) {
          callback(event);
        }
      });
    }
  };

  /**
   * Add event listener (events will handling by root listener)
   * @param {string} target
   * @param {string} type
   * @param {function} callback
   * @param {boolean} useCapture
   */
  addEventListener = (target, type, callback, useCapture = false) => {
    let listeners = useCapture ? this.listenersCapturing : this.listenersBubbling;
    if (!listeners[type]) {
      listeners[type] = [];
      this._initRootListener(type, useCapture);
    }
    listeners[type].push({
      target,
      callback
    });
  };

  /**
   * Controller destructor
   * @desc remove all root listener events handling
   */
  destroy() {
    Object.keys(this.listenersBubbling).forEach(type => this.node.removeEventListener(type, this._eventHandler));
    Object.keys(this.listenersCapturing).forEach(type => this.node.removeEventListener(type, this._eventHandler));
  }

}
