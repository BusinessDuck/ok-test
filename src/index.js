import "./core";
import "./assets/scss/application.scss";
import { Container } from "./components/container";
import { componentManager } from "./core";

/**
 * App Bootstrap
 */
document.addEventListener("DOMContentLoaded", function () {
  componentManager.bootstrap("app");
  document.getElementById("app").innerHTML = new Container().render();
});


