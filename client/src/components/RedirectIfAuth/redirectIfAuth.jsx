import React from "react";
import { Route, Redirect } from "react-router-dom";
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes" });

const RedirectIfAuth = ({ path, props, component: Component }) => {
  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     userId = JSON.parse(localStorage.getItem("user")._id);
  //     console.log(userId);
  //     url = `/user/${userId}/userProfile`;
  //   }
  // }, []);

  return (
    <Route
      exact
      path={path}
      render={routerProps => {
        if (!ls.get("user")) {
          return <Component {...props} {...routerProps} />;
        }
        return <Redirect to={`/user/${ls.get("user")._id}/userProfile`} />;
      }}
    />
  );
};

export default RedirectIfAuth;
