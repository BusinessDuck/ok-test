import { Component, html } from "../../core";
import { Interests } from "../interests";
import { InterestsFriend } from "../interestsFriend";
import "./style.scss";

export class Container extends Component {

  constructor() {
    super();
  }

  render() {
    const interestsComponent = new Interests();
    const interestsFriendComponent = new InterestsFriend(interestsComponent.hash);

    return html`
      <div id="${this.hash}" class="container">
        ${interestsComponent.render()}
        ${interestsFriendComponent.render()}
      </div>`;
  }
}
