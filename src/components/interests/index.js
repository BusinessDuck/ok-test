import { Component, html } from "../../core";
import { InterestsController } from "./controller";

import "./style.scss";

export class Interests extends Component {

  constructor() {
    super();
    this.controller = new InterestsController(this);
  }

  onComponentMount(node) {
    this.controller.DOMConnect(node);
  }

  onComponentUnMount() {
    this.controller.destroy();
  }

  // onComponentUpdate(node) {
  //   this.controller.DOMConnect(node);
  //   this.controller.initListeners(node);
  // }

  render(interests) {
    const { controller } = this;
    return `
      <div id="${this.hash}">
        <div class="interests ${controller.getClassName()}">
          <h2 class="interests__title">${controller.getTitle()}</h2>
          ${interests ? this.renderInterests(interests) : this.renderLoading()}
        </div>
      </div>`;
  }

  renderInterests = (interests) => {
    return html`
      <div class="interests__wrapper">
        <div class="interests__subtitle"><span>${interests.name}</span></div>
          <div class="interests__block">
            ${this.renderControls()}
            <ul class="interests__list">
             ${this.renderInterestItems(interests.items)}
            </ul>
            ${this.renderMoreInterests(8)}
          </div>
      </div>
    `;
  };

  renderInterestItems(items) {
    return items.map(item => html`
      <li class="interests__list__item interests__list__item--show" data-id="${item.id}">
        <i class="icon icon--remove"></i>
        <span>${item.name}</span>
      </li>`).join("");
  }

  renderMoreInterests(count) {
    return html`
      <div class="interests__more">
        Еще ${count} увлечений
      </div>
    `;
  }

  renderLoading() {
    return `
      <div class="interests__loading"></div>
    `;
  }

  renderControls() {
    return `
      <div class="controls">
        <input type="text" class="controls__input controls__input--text" name="interest_name" placeholder="Добавьте любимую музыку"/>
        <input type="button" class="controls__input controls__input--button" value="Добавить">
      </div>
    `;
  }
}
