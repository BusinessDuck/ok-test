export class MutationObserver {

  constructor(callback = () => null) {
    this.callback = callback;
  }

  observe(element, options) {
    this.element = element;
  }

  emulateEvent(mutationsMock = []) {
    const html = this.element.innerHTML;
    if (html !== this.oldHtml) {
      this.oldHtml = html;
      return this.callback(mutationsMock);
    }
  }

  disconnect() {
  }
}
