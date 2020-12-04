export function eventPath(event) {
  let path = (event.composedPath && event.composedPath()) || event.path;

  if (!path) {
    let element = event.target;
    path = [];
    while (element) {
      path.push(element);
      if (element.tagName === "HTML") {
        path.push(document);
        path.push(window);
        return path;
      }

      element = element.parentElement;
    }
  }

  return path;
}
