import { componentManager } from "../../core";
import { InterestsController } from "../interests/controller";
import { Service } from "./service";

/**
 * Controller
 */
export class FriendInterestsController extends InterestsController {

  constructor(component, interestsComponentHash) {
    super(component);
    this.interestsComponentHash = interestsComponentHash;
  }

  initListeners() {

    this.addEventListener("interests__list__report", "click", this.reportInterest, true);

    this.addEventListener("interests__list__item", "click", this.addToMyInterests);
    this.addEventListener("interests__more", "click", this.getMoreInterests);

  }

  setService() {
    this.service = Service;
  }

  getTitle() {
    return "Интересы друга";
  }

  getClassName() {
    return `interests--friend ${!this.isReady() ? "interests--loading" : ""}`;
  }

  /**
   * Copy friend interest to mine list
   * @param {Event} event
   * @return {boolean|undefined}
   */
  addToMyInterests = (event) => {
    const itemNode = event.target.dataset.id ? event.target : event.target.parentNode;
    if(itemNode.querySelector(".icon--ok")) { //prevent double-clicking
      return false;
    }
    const interestsController = componentManager.getComponentController(this.interestsComponentHash);
    interestsController.addInterestToDOM(itemNode.querySelector("span").innerText); //id will be in prod, now we force value (for mocks id cannot be used)
    this.successAnimation(itemNode);
  };

  /**
   * Success copy interest animation, fade icon after success
   * @param itemNode
   */
  successAnimation = (itemNode) => {
    const iconNode = itemNode.querySelector(".icon");
    iconNode.classList.remove("icon--add");
    iconNode.classList.add("icon--ok");

    setTimeout(() => {
      iconNode.classList.add("icon--fadeout");
    }, 10);

    setTimeout(() => {
      iconNode.classList.add("icon--add");
      iconNode.classList.remove("icon--fadeout");
      iconNode.classList.remove("icon--ok");
    }, 1000);

  };

  /**
   * Connect with modal component instance
   * @param hash
   */
  setModal = (hash) => {
    this.modalComponent = componentManager.getComponentInstance(hash);
  };

  /**
   * Open report friend interest form in modal popup
   * @param event
   */
  reportInterest = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this.modalComponent.controller.toggleOpenClose();
  }
}

