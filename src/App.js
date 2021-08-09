import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";


// this function is impure
function app(initModel, update, view, node) {
  let model = initModel;
  // pass dispatch and model to view function. asssign to current view
  let currentView = view(dispatch, model);
  // create element with current view
  let rootNode = createElement(currentView);
  // append rootNode to node
  node.appendChild(rootNode);
  // dispatch function
  function dispatch(msg) {
    // update model using update function
    model = update(msg, model);
    // WE PASS dispatch to update view
    const updatedView = view(dispatch, model);
    // get difference between html
    const patches = diff(currentView, updatedView);
    // update
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

export default app;
