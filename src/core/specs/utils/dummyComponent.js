import { Component } from "../../component";
import { html } from "../../utils/parsers"
export class DummyComponent extends Component {

  /**
   * Dummy component for unit testing
   * @param {object} props
   * @param {function} props.onMountHandleFn
   * @param {function} props.onUpdateHandleFn
   * @param {function} props.onUnMountHandleFn
   * @param {string} props.className
   */
  constructor(props) {
    super();
    this.props = props;
  };

  onComponentMount(node) {
    this.props.onMountHandleFn(node);
  }

  onComponentUpdate(node) {
    this.props.onUpdateHandleFn(node);
  }

  onComponentUnMount() {
    this.props.onUnMountHandleFn();
  }

  render() {
    return html`
      <div id="${this.hash}">
        <span class="${this.props.className}">DummyComponent</span>
      </div>
    `
  }
}
