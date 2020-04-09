import React from "react";
import ReactDOM from "react-dom";
import { withRouter, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
// import notification from "./Services/notifications";
import * as serviceWorker from "./serviceWorker";
import notification from "./Services/notifications";

const Main = withRouter(props => {
  return <App {...props} noty={new notification()} />;
});

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
