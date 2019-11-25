import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
import Logged from "./views/Logged/Logged.jsx";
import Unlogged from "./views/Unlogged/Unlogged.jsx";
import * as serviceWorker from "./serviceWorker";

function check() {
  var jwt = require("jsonwebtoken");
  if (localStorage.getItem("token") !== null) {
    try {
      var decoded = jwt.verify(
        localStorage.getItem("token"),
        "InternetoweBazyDanych"
      );
      // console.log(decoded)
      localStorage.setItem("userID", decoded.nameid);
    } catch (err) {
      return false;
    }

    // console.log(decoded)
    if (decoded.aud === "W4rta") return true;
    else return false;
  } else return false;
}

if (check()) {
  ReactDOM.render(<Logged />, document.getElementById("root"));
} else {
  ReactDOM.render(<Unlogged />, document.getElementById("root"));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
