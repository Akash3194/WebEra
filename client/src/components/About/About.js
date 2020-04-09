import React, { Fragment } from "react";
import { Grid, Container } from "@material-ui/core";
import twentyFour from "./../../images/customer_support _cropped.png";
import wemake from "./../../images/you_say_we_make.jpeg";
import integrate from "./../../images/integrate.png";
import cheap from "./../../images/Budget_plans.jpeg";
import privacy from "./../../images/privacy.jpeg";
import unlimitedImage from "./../../images/unlimited.png";
import updates from "./../../images/Updates.png";
import free_trail from "./../../images/sevenDay.jpg";
import CardCustom from "./CardCustom";
import useStyles from "../BasicStyles/BasicStyles";

const About = () => {
  const classes = useStyles();
  const blue = "#3963ae";
  const privacy_clr = "#f0c53b";
  const unl_clr = "#deeff6";

  return (
    <Fragment>
      <Container maxWidth="xl" className={classes.boxSection} id="about">
        <Grid container className={`${classes.center}`}>
          <Grid item sm={3} className={classes.my4}>
            <CardCustom
              cardImage={wemake}
              cardText="We ourselves build your bot for your need, you do not need to hire anybody to make a bot"
              cardHeading="You SAY WE MAKE"
              cardColor="#94b5d4"
            />
          </Grid>
          <Grid item sm={3} className={classes.my4}>
            <CardCustom
              cardImage={unlimitedImage}
              cardText="We provide unlimited no. of bots and unlimited number of
              FAQ bot and unlimited number pf storage in every pricing"
              cardHeading="UNLIMITED SERVICE"
              cardColor={blue}
            />
          </Grid>
          <Grid item sm={3} className={classes.my4}>
            <CardCustom
              cardImage={integrate}
              cardText="We provide instant integration of your chatbot to your
              website and a pre ready chatbot for small talks instantly
              when you starts our services"
              cardHeading="INSTANT INTEGRATION"
              cardColor="#02b0b4"
            />
          </Grid>
          <Grid item sm={3} className={classes.my4}>
            <CardCustom
              cardImage={twentyFour}
              cardText="We provide 24/7 customer support services so that you do
              not suffer with any problem"
              cardHeading="24/7 SUPPORT"
              cardColor={blue}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.center}>
          <Grid item sm={3} className={classes.my4}>
            <CardCustom
              cardImage={free_trail}
              cardText="We offcourse provide you with 7 days free trial to our
              bot and then you can continue if you like"
              cardHeading="FREE TRIAL"
              cardColor={blue}
            />
          </Grid>
          <Grid item sm={3} className={classes.my4}>
            <CardCustom
              cardImage={cheap}
              cardText="Services we provide is in cheapest price but if you want
              to be more cheap then we also have yearly plans with more
              low rates"
              cardHeading="BUDGET PLANS"
              cardColor="#c0751a"
            />
          </Grid>
          <Grid item sm={3} className={classes.my4}>
            <CardCustom
              cardImage={privacy}
              cardText="Privacy of your data is our responsibility, your data will
              be yours"
              cardHeading="PRIVACY"
              cardColor={privacy_clr}
            />
          </Grid>
          <Grid item sm={3} className={classes.my4}>
            <CardCustom
              cardImage={updates}
              cardText="Our work does not stop over here, we also updates your
              chatbot performance time to time if you need it to make
              your chatbot more better every time someone talks to it"
              cardHeading="FREE UPDATES"
              cardColor="#0c577d"
            />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default About;
