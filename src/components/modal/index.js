import { Component, html } from "../../core";
import "./style.scss";
import { ModalController } from "./controller";

/**
 * Modal component
 */
export class Modal extends Component {

  constructor(props) {
    super();
    this.props = props;
    this.controller = new ModalController(this);
  }

  onComponentMount(node) {
    this.controller.DOMConnect(node);
    this.controller.initListeners();
  }

  render() {
    const { props, hash } = this;

    return html`
      <div id="${hash}" class="modal">
        <div class="modal__content">
          <div class="modal__header">
            <span class="modal__close">&times;</span>
            <h2>${props.title}</h2>
          </div>
          <div class="modal__body">
            ${props.content}
          </div>
        </div>
      </div>
    `;
  }
}
