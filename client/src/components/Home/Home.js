import React, { Fragment } from "react";
import { Box, Grid, Typography, Container } from "@material-ui/core";
import botImage from "./../../images/main_web_image.png";
import botImage2 from "./../../images/botstanding.jpeg";
import useStyles from "../BasicStyles/BasicStyles";
const Home = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container className={classes.boxSection} id="home">
        <img src={botImage} alt="" className={classes.widthFluid} />
        <Grid item sm={6}>
          <Box
            display="flex"
            justifyContent="center"
            // alignItems="center"
            flexDirection="column"
            style={{ width: "50%" }}
            mx="auto"
            mt="-600px"
            className={`${classes.textCenter}`}
          >
            <Typography variant="h2" className={`blue-color`}>
              WE BUILD CHATBOTS
            </Typography>
            <Typography className={`blue-color ${classes.my4}`} variant="h6">
              Get a chatbot for your company, we provide a perfect chatbot for
              your need
            </Typography>
            <a href="#pricing">
              <button className="btn1 btn-main">Get Started</button>
            </a>
          </Box>
        </Grid>
      </Grid>
      <Container maxWidth="lg">
        <Grid
          container
          className={`${classes.boxSection} ${classes.textCenter}`}
        >
          <Grid item xs={5}>
            <img src={botImage2} alt="" className={`${classes.imgFluid}`} />
          </Grid>
          <Grid item xs={7}>
            <Box
              display="flex"
              flexDirection="column"
              // alignItems="center"
              justifyContent="center"
              width="85%"
              mx="auto"
              textAlign="left"
              className={`${classes.heightFluid} blue-color`}
            >
              <Typography variant="h1">What And Why Chatbots?</Typography>
              <Typography variant="h5" className={`${classes.my4} `}>
                A chatbot is an artificial intelligence (Al) software that can
                simulate a conversation (or a chat) with a user in natural
                language.
              </Typography>
              <Typography variant="h5">
                Chatbot applications streamline interactions between people and
                services, enhancing customer experience. At the same time, they
                offer companies new opportunities to improve the customers
                engagement process and operational efficiency by reducing the
                typical cost of customer service.{" "}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Home;
