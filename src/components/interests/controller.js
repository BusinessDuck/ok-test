import { Controller } from "../../core";
import { getNodes } from "../../core/utils/parsers";
import { Service } from "./service";

export class InterestsController extends Controller {
  constructor(component) {
    super(component);

    this.mouseOnButtonAdd = false;
    this.interests = null;
    this.setService();
    this.getInterests();
  }

  initListeners() {

    this.addEventListener("interests__list__item", "click", this.removeInterest);
    this.addEventListener("interests__more", "click", this.getMoreInterests);
    this.addEventListener("controls__input--text", "keydown", this.addInterestFromInput);
    this.addEventListener("controls__input--button", "click", this.addInterestFromButton);

    this.addEventListener("controls__input--text", "focus", this.toggleButtonVisible, true);
    this.addEventListener("controls__input--text", "blur", this.toggleButtonVisible, true);
    this.addEventListener("controls__input--button", "mouseenter", this.mouseOnButton, true);
    this.addEventListener("controls__input--button", "mouseleave", this.mouseOnButton, true);

  }

  getClassName() {
    return `interests--personal ${!this.isReady() ? "interests--loading" : ""}`;
  }

  isReady() {
    return !!this.interests;
  }

  getTitle() {
    return "О себе";
  }

  /**
   * Detect mouse position inside of button, for prevent button hide
   */
  mouseOnButton = () => {
    this.mouseOnButtonAdd = !this.mouseOnButtonAdd;
  };

  /**
   * Remove interest from DOM with fade-out animation
   * Execute removing node after timeout
   * @param itemNode
   * @param callback
   */
  removeInterestFromDOM = (itemNode, callback = () => null) => {
    itemNode.classList.remove("interests__list__item--show");
    setTimeout(() => {
      callback();
    }, 200);
  };

  /**
   * Create element in DOM after ajax complete, display pre-loader while ajax isn't completed
   * @param value
   * @return {Promise.<TResult>|Promise<any>|*|Thenable<any>}
   */
  addInterestToDOM = (value) => {
    if(!value) {
      return false;
    }
    const listItemNode = getNodes(this.component.renderInterestItems([{}]));
    const listNode = this.node.querySelector(".interests__list");
    listItemNode.classList.remove("interests__list__item--show");
    listNode.insertBefore(listItemNode, listNode.firstElementChild);
    this.animateItemAdd(listItemNode);
    this.animateItemLoadingToggle(listItemNode);

    return this.service.addItem(value).then((item) => {
      listItemNode.dataset.id = item.id;
      listItemNode.querySelector("span").innerText = item.name;
      this.interests.items.push(item);
      this.animateItemLoadingToggle(listItemNode);
    });
  };

  /**
   * Handle input enter key pressing
   * @param event
   */
  addInterestFromInput = (event) => {
    if (event.key === "Enter") {
      this.addInterestToDOM(event.target.value);
      event.target.value = "";
    }
  };

  /**
   * Handle add button click, get value from input and add
   */
  addInterestFromButton = () => {
    const inputNode = this.node.querySelector(".controls__input--text");
    this.addInterestToDOM(inputNode.value);
    inputNode.value = "";
    inputNode.focus();
  };

  /**
   * Animate fade-in for interest element
   * @param itemNodes
   */
  animateItemAdd(itemNodes) {
    setTimeout(() => {
      itemNodes.classList.add("interests__list__item--show");
    }, 10);
  }

  /**
   * Hide button add, when input in dis-focus or show when in focus
   * @param event
   */
  toggleButtonVisible = (event) => {
    const buttonNode = this.node.querySelector(".controls__input--button");
    if (event.type === "focus") {
      return buttonNode.classList.add("controls__input--visible");
    }

    if (!this.mouseOnButtonAdd) {
      buttonNode.classList.remove("controls__input--visible");
    }
  };

  /**
   * Remove interest event handler
   * @param event
   * @return {boolean}
   */
  removeInterest = (event) => {
    const itemNode = event.target.dataset.id ? event.target : event.target.parentNode;
    if (
      itemNode.classList.contains("interests__list__item--loading") ||
      !itemNode.classList.contains("interests__list__item--show")
    ) {
      return false;
    }
    this.service.removeItem(itemNode.dataset.id);
    this.removeInterestFromDOM(itemNode, () => {
      itemNode.parentNode.removeChild(itemNode);
    });
  };

  animateItemLoadingToggle(node) {
    node.classList.toggle("interests__list__item--loading");
  }

  /**
   * Get interests list from the back-end (mocks)
   */
  getInterests() {
    this.service.getInterest().then(interests => {
      this.interests = interests;
      this.node.innerHTML = getNodes(this.component.render(interests)).innerHTML;
      this.initListeners();
    });
  }

  /**
   * Set service for working with back-end
   */
  setService() {
    this.service = Service;
  }

  /**
   * Load more click handler
   * @param event
   * @return {boolean}
   */
  getMoreInterests = (event) => {
    if (event.target.classList.contains("interests__more--loading")) {
      return false;
    }
    event.target.classList.add("interests__more--loading");
    this.service.getMoreInterests(event.target.dataset.id).then(newInterests => {
      const listNode = this.node.querySelector(".interests__list");
      this.interests.items.concat(newInterests);
      newInterests.forEach(interest => {
        const node = getNodes(this.component.renderInterestItems([interest]));
        node.classList.remove("interests__list__item--show");
        listNode.appendChild(node);
        this.animateItemAdd(node);
      });
      event.target.classList.remove("interests__more--loading");
    });
  };
}

