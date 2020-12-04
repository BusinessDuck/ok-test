import { componentManager } from "../componentManager";
import { getNodes } from "../utils/parsers";
import { MutationObserver } from "./utils/mutationObserverPolyfill";

xdescribe("core.componentManager", () => {
  const app = getNodes(`<div id="app"><span class="node1">node 1</span> <span>node 2</span></div>`);
  componentManager._handleLifecycle = jest.fn(componentManager._handleLifecycle);
  window.MutationObserver = MutationObserver;
  document.body.appendChild(app);


  it("Bootstrapping DOM emulate, manager should bootstrapped", () => {
    expect(componentManager.bootstrap("app")).toBeUndefined(); //function should work with Observer
  });

  it("Lifecycle callbacks should be called when dom has been changed", () => {
    const mutations = [
      { target: null, addedNodes: [], removedNodes: [] }
    ];
    componentManager._mutationObserver.emulateEvent();
    expect(componentManager._mutationObserver).toBeDefined();
    componentManager._mutationObserver.emulateEvent();
    expect(componentManager._handleLifecycle).not.toBeCalled();
    document.querySelector(".node1").classList.add("node1--mod");
    componentManager._mutationObserver.emulateEvent(mutations);
    expect(componentManager._handleLifecycle).toHaveBeenCalled();
    componentManager.disconnect();
  });

  it("Component should be registered in manager", () => {
    componentManager.register({ mockData: "data", hash: "123" });
    expect(componentManager.componentsMap["123"].mockData).toBe("data");
  });

  it("Component should be removed from manager state", () => {
    const hash = "123";
    componentManager.register({ mockData: "data", hash: hash });
    expect(componentManager.componentsMap[hash].mockData).toBe("data");
    componentManager.unRegister(hash);
    expect(componentManager.componentsMap[hash]).toBeUndefined();
  });

  it("Method should return component instance by hash", () => {
    const hash = "12345";
    componentManager.register({ mock: "data", hash: hash });
    expect((componentManager.getComponentInstance(hash) || {}).mock).toBe("data");
  });

  it("Method should returns component controller instance by hash", () => {
    const hash = "123456";
    componentManager.register({ mock: "data", hash: hash, controller: { foo: "bar" } });
    expect((componentManager.getComponentController(hash) || {}).foo).toBe("bar");
  });

});
