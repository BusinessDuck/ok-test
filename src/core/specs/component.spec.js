import { DummyComponent } from "./utils/dummyComponent";
import { getNodes } from "../utils/parsers";
import { componentManager } from "../componentManager";
import { MutationObserver } from "./utils/mutationObserverPolyfill";

describe("core.Component", () => {
  let props, dummyComponent, componentNode, appNode, testNode;

  beforeEach(() => {
    props = {
      onMountHandleFn: jest.fn(),
      onUpdateHandleFn: jest.fn(),
      onUnMountHandleFn: jest.fn(),
      className: "test-class"
    };
    dummyComponent = new DummyComponent(props);
    componentNode = getNodes(dummyComponent.render());
    appNode = getNodes(`<div id="app"></div>`);

    window.MutationObserver = MutationObserver;
    appNode.appendChild(componentNode);
    document.body.appendChild(appNode);
    testNode = document.querySelector(".test-class");
    componentManager.bootstrap("app");
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("Id should be unique for 1000 times generations", () => {
    const hashArray = [];
    for (let i = 0; i < 1000; i++) {
      expect(hashArray.includes(dummyComponent.hash)).toBeFalsy();
      hashArray.push((dummyComponent.hash));
      dummyComponent.updateHash();
    }

    hashArray.length = 0; //keep memory clean
  });

  it("Props should be passed to component", () => {
    expect(componentNode.querySelector(".test-class")).toBeDefined();
  });

  it("Mount component lifecycle method should be called", () => {
    const mutations = [
      { target: appNode, addedNodes: [componentNode], removedNodes: [] }
    ];
    componentManager._mutationObserver.emulateEvent([]);
    testNode.classList.add("test-class-mod"); //need for dom changed hack for emulate event
    componentManager._mutationObserver.emulateEvent(mutations);
    expect(props.onMountHandleFn).toHaveBeenCalled();
  });

  it("Update component lifecycle method should be called", () => {
    const mutations = [
      { target: componentNode, addedNodes: [componentNode], removedNodes: [] }
    ];
    componentManager._mutationObserver.emulateEvent([]);
    testNode.classList.add("test-class-mod");
    componentManager._mutationObserver.emulateEvent(mutations);
    expect(props.onUpdateHandleFn).toHaveBeenCalled();
  });

  it("UnMount component lifecycle method should be called", () => {
    const mutationsMount = [
      { target: appNode, addedNodes: [componentNode], removedNodes: [] }
    ];
    const mutationsUnmount = [
      { target: appNode, addedNodes: [], removedNodes: [componentNode] }
    ];

    componentManager._mutationObserver.emulateEvent([]);
    testNode.classList.add("test-class-mod");
    componentManager._mutationObserver.emulateEvent(mutationsMount);
    testNode.remove("test-class-mod");
    componentManager._mutationObserver.emulateEvent(mutationsUnmount);
    expect(props.onUnMountHandleFn).toHaveBeenCalled();
  });

});
