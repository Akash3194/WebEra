import React, { Fragment } from "react";
import { Box, Grid, Container } from "@material-ui/core";
import botChatImage from "./../../images/robot.png";
import userImage from "./../../images/user.png";

const HowItWorks = ({
  boxSection,
  marginStep,
  center,
  chatImg,
  step,
  widthFluid,
}) => {
  const lastChat = "Welcome :)";
  return (
    <Fragment>
      <Container maxWidth="xl" className={boxSection} id="howItWorks">
        <Grid container className={`${marginStep}`}>
          <Grid item xs={3} className={`${center}`}>
            <img src={botChatImage} alt="" className={chatImg} />
          </Grid>
          <Grid item xs={9} className={`${center} ${step}`}>
            <Box className={widthFluid}>
              do you know that there is a much better way in interacting with
              customers and generate leads or sell your product like never
              before. Do you want to know about it?
            </Box>
          </Grid>
        </Grid>
        <Grid container className={`${marginStep}`}>
          <Grid item xs={9} className={`${center} ${step}`}>
            <Box className={widthFluid}>yes i would like to.</Box>
          </Grid>
          <Grid item xs={3} className={`${center}`}>
            <img src={userImage} alt="" className={chatImg} />
          </Grid>
        </Grid>
        <Grid container className={`${marginStep}`}>
          <Grid item xs={3} className={`${center}`}>
            <img src={botChatImage} alt="" className={chatImg} />
          </Grid>
          <Grid item xs={9} className={`${center} ${step}`}>
            <Box className={widthFluid}>
              ok, so this new way is using chatbots. It uses AI to understand
              what the user is saying and replies according to that. It can talk
              to customer, sell products, can solve their issues and much more.
              It can save your costs, talk to customers with instant replied and
              increase your revenue, leads and the most important part is it can
              work 24/7.
            </Box>
          </Grid>
        </Grid>
        <Grid container className={`${marginStep}`}>
          <Grid item xs={9} className={`${center} ${step}`}>
            <Box className={widthFluid}>
              But i would need a lot of people to make that bot and i would
              require a lot of money.
            </Box>
          </Grid>
          <Grid item xs={3} className={`${center}`}>
            <img src={userImage} alt="" className={chatImg} />
          </Grid>
        </Grid>
        <Grid container className={`${marginStep}`}>
          <Grid item xs={3} className={`${center}`}>
            <img src={botChatImage} alt="" className={chatImg} />
          </Grid>
          <Grid item xs={9} className={`${center} ${step}`}>
            <Box className={widthFluid}>
              Not at all, Our comapny will help you in that, you just have to
              tell us what kind of bot you need and you will find it deployed on
              your web very soon.
            </Box>
          </Grid>
        </Grid>
        <Grid container className={`${marginStep}`}>
          <Grid item xs={9} className={`${center} ${step}`}>
            <Box className={widthFluid}>
              Wow, that's super easy. How do i contact you for a bot.
            </Box>
          </Grid>
          <Grid item xs={3} className={`${center}`}>
            <img src={userImage} alt="" className={chatImg} />
          </Grid>
        </Grid>
        <Grid container className={`${marginStep}`}>
          <Grid item xs={3} className={`${center}`}>
            <img src={botChatImage} alt="" className={chatImg} />
          </Grid>
          <Grid item xs={9} className={`${center} ${step}`}>
            <Box className={widthFluid}>
              Thank you and you can find our contact details at the end of this
              webpage.
            </Box>
          </Grid>
        </Grid>
        <Grid container className={`${marginStep}`}>
          <Grid item xs={9} className={`${center} ${step}`}>
            <Box className={widthFluid}>Thank you.</Box>
          </Grid>
          <Grid item xs={3} className={`${center}`}>
            <img src={userImage} alt="" className={chatImg} />
          </Grid>
        </Grid>
        <Grid container className={`${marginStep}`}>
          <Grid item xs={3} className={`${center}`}>
            <img src={botChatImage} alt="" className={chatImg} />
          </Grid>
          <Grid item xs={9} className={`${center} ${step}`}>
            <Box className={widthFluid}>{lastChat}</Box>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default HowItWorks;
