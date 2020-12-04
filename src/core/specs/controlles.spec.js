import { Controller } from "../controller";

describe('core.Controller', () => {
  const controllerInstance = new Controller({foo: "bar"});
  const node = document.createElement("div");

  it("component should setted up", () => {
    expect(controllerInstance.component.foo).toBe("bar");
  });

  it("constructor pre define objects", () => {
    expect(controllerInstance.listenersBubbling).toBeDefined();
    expect(controllerInstance.listenersCapturing).toBeDefined();
    expect(Object.keys(controllerInstance.listenersBubbling).length).toBe(0);
    expect(Object.keys(controllerInstance.listenersCapturing).length).toBe(0);
  });

  it("DOMConnect established", () => {
    node.classList.add("test__element");
    controllerInstance.DOMConnect(node);
    expect(controllerInstance.node.classList.contains("test__element")).toBeTruthy();
    node.classList.add("test__element__modified"); //link established
    expect(controllerInstance.node.classList.contains("test__element__modified")).toBeTruthy();
  });

  it("root listener should handle events by class name", () => {
    const sendEventMock = jest.fn();
    const onClickMock = jest.fn(() => {
      sendEventMock();
    });
    controllerInstance.addEventListener("test__element", "click", onClickMock, false);
    node.click();

    expect(sendEventMock).toBeCalled();
  });

  it("root listener should be removed after controller destroy", () => {
    const sendEventMock = jest.fn();
    const onClickMock = jest.fn(() => {
      sendEventMock();
    });
    controllerInstance.addEventListener("test__element", "click", onClickMock, false);
    controllerInstance.destroy();
    node.click();

    expect(sendEventMock).not.toBeCalled();
  })

});
