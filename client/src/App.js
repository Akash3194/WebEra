import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Bot from "./components/Bot/Bot";
import Profile from "./components/Profile/Profile";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Drawer from "./components/Drawer/Drawer";
import ChatBots from "./components/ChatBots/ChatBots";
import Pricing from "./components/Pricing/Pricing";
import ClientBot from "./components/ClientBot/ClientBot";
import RedirectIfAuth from "./components/RedirectIfAuth/redirectIfAuth";
import RedirectIfNotAuth from "./components/RedirectIfNotAuth/RedirectIfNotAuth";
import AddBot from "./components/AddBot/AddBot";
import Subscription from "./components/Subscription/Subscription";
// import NoMatch from "./components/NoMatch/NoMatch";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route
          exact
          path={
            /^(\/addbots\/keyegwkleklrnrg32rn52n2lk3rn2lk3rnl3n2lr23lkn2lk2d)|(\/*[a-zA-Z0-9]*(?!([^/].+)))$/
          }
          component={Navbar}
        />
        <Route
          path={/^\/*[a-zA-Z0-9]*(?!([^/].+))$/}
          render={props => <Bot {...props} noty={this.props.noty} />}
        />
        <RedirectIfNotAuth
          path="/user/:userId"
          component={Drawer}
          props={{ noty: this.props.noty }}
        />
        <RedirectIfNotAuth
          path="/user/:userId/userProfile"
          component={Profile}
          props={{ noty: this.props.noty }}
        />
        <RedirectIfNotAuth
          path="/user/:userId/myChatbots"
          component={ChatBots}
          props={{ noty: this.props.noty }}
        />
        <RedirectIfNotAuth
          path="/user/:userId/pricing"
          component={Pricing}
          props={{ noty: this.props.noty }}
        />
        <RedirectIfNotAuth
          path="/user/:userId/subscription/:type"
          component={Subscription}
          props={{ noty: this.props.noty }}
        />
        <RedirectIfAuth
          path="/login"
          component={Login}
          props={{ noty: this.props.noty }}
        />
        <RedirectIfAuth
          path="/signup"
          component={Signup}
          props={{ noty: this.props.noty }}
        />
        <RedirectIfAuth
          path="/forgotPassword"
          component={ForgotPassword}
          props={{ noty: this.props.noty }}
        />
        <RedirectIfAuth
          path="/"
          component={Landing}
          props={{ noty: this.props.noty }}
        />

        <Route exact path="/" component={Footer} />
        <Route
          exact
          path="/companies/:companyId/bots/:botId"
          component={ClientBot}
        />
        <Route
          exact
          path="/addbots/keyegwkleklrnrg32rn52n2lk3rn2lk3rnl3n2lr23lkn2lk2d"
          render={props => <AddBot {...props} noty={this.props.noty} />}
        />
      </Router>
    );
  }
}

export default App;
