import { Component, html } from "../../core/index";
import "./style.scss";

/**
 * Report form component
 */
export class ReportForm extends Component {

  constructor(content) {
    super();
    this.content = content;
  }

  render() {
    return html`
      <form id="${this.hash}" class="report__form">
        <label>Сообщение:</label>
        <textarea name="message" class="report__message"></textarea>
        <input type="button" class="report__button" value="Отправить"/>
      </form>
    `;
  }
}
