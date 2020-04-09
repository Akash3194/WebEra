import React from "react";
import { Route, Redirect } from "react-router-dom";
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes" });
const RedirectIfNotAuth = ({ path, props, component: Component }) => {
  return (
    <Route
      path={path}
      render={routerProps => {
        if (ls.get("user")) {
          return <Component {...props} {...routerProps} />;
        }

        return <Redirect to="/login" />;
      }}
    />
  );
};

export default RedirectIfNotAuth;
