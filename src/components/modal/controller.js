import { Controller } from "../../core";

export class ModalController extends Controller {
  constructor(component) {
    super(component);
  }

  initListeners() {
    this.addEventListener("modal__close", "click", this.toggleOpenClose);
    this.addEventListener("report__button", "click", this.toggleOpenClose);
  }


  toggleOpenClose = () => {
    this.node.classList.toggle("modal--opened");
  };

}

