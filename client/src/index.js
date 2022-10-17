import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import Reduxthunk from "redux-thunk";
import rootReducer from "./_reducers";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  Reduxthunk
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider
      store={createStoreWithMiddleware(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
