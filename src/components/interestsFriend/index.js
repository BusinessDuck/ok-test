import { FriendInterestsController } from "./controller";
import { Interests } from "../interests";
import { html } from "../../core";
import { ReportForm } from "../reportForm/formComponent";
import { Modal } from "../modal/";
import "./style.scss";
import { getNodes } from "../../core/utils/parsers";

export class InterestsFriend extends Interests {

  constructor(hash) {
    super();
    this.controller = new FriendInterestsController(this, hash);
  }

  /**
   * Create deep components (modal, form) when component has been mounted
   * @param node
   */
  onComponentMount(node) {
    super.onComponentMount(node); //call parent mount fn
    const reportFormComponent = new ReportForm();
    const modalProps = {
      content: reportFormComponent.render(),
      title: "Отправить жалобу"
    };
    const modalComponent = new Modal(modalProps);

    this.controller.setModal(modalComponent.hash);
    node.parentNode.appendChild(getNodes(modalComponent.render()));
  }

  /**
   * Remove controls render from parent class
   * @return {string}
   */
  renderControls() {
    return "";
  }

  renderInterestItems(items) {
    return items.map(item => html`
      <li class="interests__list__item interests__list__item--show" data-id="${item.id}">
        <i class="icon icon--add"></i>
        <span>${item.name}</span>
        <div class="interests__list__report">
          <i class="icon icon--report"></i>
          <span>Пожаловаться</span>
        </div>
      </li>`).join("");
  }

}
