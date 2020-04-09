import React, { Fragment } from "react";
// import { createMuiTheme } from "@material-ui/core/styles";

import About from "../About/About";
// import HowItWorks from "../HowItWorks/HowItWorks";
import Home from "../Home/Home";
import ContactUs from "../ContactUs/ContactUs";
import Pricing from "../Pricing/Pricing";
// import Bot from "../Bot/Bot";

const Landing = props => {
  return (
    <Fragment>
      {/* For Home Section */}
      <Home />

      {/* For About section */}

      <About />

      {/* For pricing section */}
      <Pricing props={props} />

      {/* <Bot /> */}

      {/* For Contact Us Section */}
      <ContactUs />
    </Fragment>
  );
};

export default Landing;
