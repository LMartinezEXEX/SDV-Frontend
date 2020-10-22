import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import showResults from "./showResults";
import SimpleForm from "./RegisterForm";
import "./assets/css/Register.css";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <SimpleForm onSubmit={showResults} />
    </div>
  </Provider>,
  rootEl
);
