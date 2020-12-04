/**
 * Get DOM Node object from string
 * !Warning for correct result, all elements should be wrapped by root node
 * @example
 * getNodes("<div class='root'><div class='child1'></div><div class='child2'></div></div>");
 * @param {string} str
 * @return {Node|undefined}
 */
export function getNodes(str) {
  return new DOMParser().parseFromString(str, "text/html").body.childNodes[0];
}

/**
 * Replace hidden line endings symbols for template literals see more in core.Component prototype
 * @param strings
 * @param values
 * @return {string}
 */
export function html(strings, ...values) {
  let output = "";
  for (let i = 0; i < values.length; i++) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];

  // Split on newlines.
  let lines = output.split(/(?:\r\n|\n|\r)/);

  // Rip out the leading whitespace.
  return lines.map((line) => {
    return line.replace(/^\s+/gm, "");
  }).join("").trim();
}
