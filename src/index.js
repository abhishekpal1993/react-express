import React from "react";
import ReactDOM from "react-dom";

import App from "./feature/App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.css";

const application = (
  /* 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  */
  <App />);

ReactDOM.render(
  application,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
