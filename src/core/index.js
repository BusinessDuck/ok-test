export { Component } from "./component";
export { Controller } from "./controller";
export { componentManager } from "./componentManager";
export { html, getNodes } from "./utils/parsers";

/**
 * !Notice
 * !Don't use imports from core by full path
 * e.g. import { parseFloat } from "../core/utils/someUtil.js";
 * instead of this forward export to core/index.js
 *
 * better!
 * import { parseFloat } from "../core";
 */
