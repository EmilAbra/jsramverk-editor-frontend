import React from "react";
import { createRoot } from 'react-dom/client';
// import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";

import Welcome from "./Welcome";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  root.unmount(container);
  container.remove();
  container = null;
});

it("renders with Welcome message", () => {
  act(() => {
    createRoot(<Welcome />, container);
  });
  expect(container.textContent).toBe("Welcome!This is a page for you to create, save and edit your texts. Enjoy!");
});