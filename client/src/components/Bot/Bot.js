import React, { Fragment } from "react";
import {
  Button,
  Box,
  TextField,
  Container,
  Typography,
} from "@material-ui/core";
import theme from "./../Themes/themeForButtonFieldRadius";
import { ThemeProvider } from "@material-ui/core/styles";

import CloseIcon from "@material-ui/icons/Close";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import SendIcon from "@material-ui/icons/Send";
import useStyles from "../BasicStyles/BasicStyles";

const Bot = props => {
  const classes = useStyles();
  const initialState = {
    isDisplayed: false,
    haveUserDetails: false,
  };

  const userState = {
    email: "",
    phone: "",
    name: "",
    loading: false,
  };

  const [userData, setUserData] = React.useState(userState);

  const [data, setData] = React.useState(initialState);

  const chatContainerStyleFalse = {
    animation: "chatContainerHide 0.5s",
    animationFillMode: "forwards",
  };

  const chatContainerStyleTrue = {
    display: "block",
    animation: "chatConatinerShow 0.5s",
  };

  const mainBtnStyleTrue = {
    hide: {
      display: "flex",
    },
    show: {
      display: "none",
    },
  };

  const mainBtnStyleFalse = {
    hide: {
      display: "none",
    },
    show: {
      display: "flex",
    },
  };

  // To hide and show chat container
  const handleDemoClick = () => {
    if (localStorage.getItem("userBotDetails")) {
      setData({
        ...data,
        isDisplayed: !data.isDisplayed,
        haveUserDetails: true,
      });
    } else {
      setData({
        ...data,
        isDisplayed: !data.isDisplayed,
        haveUserDetails: false,
      });
    }
  };

  // To save user entered values in state
  const handleChange = event => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  // To save user details
  const handleSubmit = event => {
    event.preventDefault();

    const botUserDetails = {
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
    };

    setData({
      ...data,
      haveUserDetails: true,
    });

    localStorage.setItem("userBotDetails", JSON.stringify(botUserDetails));
  };

  // To handle  when enter is pressed
  const handleEnterPress = event => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  return (
    <Fragment>
      {/* Code for bot messages starts */}

      <div
        className="chat-container "
        style={
          data.isDisplayed ? chatContainerStyleTrue : chatContainerStyleFalse
        }
      >
        {data.haveUserDetails ? (
          <iframe
            src="http://localhost:3000/companies/hfwefh/bots/dhdewj"
            style={{ height: "99.2%", width: "100%", border: "0" }}
            title="Frame for bot component"
          ></iframe>
        ) : (
          <Fragment>
            <Container maxWidth="xl" className={` ${classes.my4}`}>
              <Box
              // borderColor="primary.main"
              // border={1}
              >
                <Typography
                  variant="h4"
                  className={`${classes.bold}  ${classes.textCenter}`}
                >
                  Enter your details
                </Typography>
                <form
                  id="userDetails"
                  action=""
                  onSubmit={handleSubmit}
                  onKeyDown={handleEnterPress}
                >
                  <ThemeProvider theme={theme}>
                    <TextField
                      className={`${classes.my4}`}
                      label="Enter Name"
                      variant="outlined"
                      name="name"
                      color="primary"
                      // value={this.state.username}
                      onChange={handleChange}
                      fullWidth
                      required
                      value={data.name}
                    />
                    <TextField
                      type="email"
                      className={`${classes.mb4}`}
                      label="Enter Email"
                      variant="outlined"
                      name="email"
                      // value={this.state.username}
                      onChange={handleChange}
                      fullWidth
                      required
                      value={data.email}
                    />
                    <TextField
                      type="number"
                      className={`${classes.mb4}`}
                      label="Enter Phone Number"
                      variant="outlined"
                      name="phone"
                      // value={this.state.password}
                      onChange={handleChange}
                      value={data.phone}
                      fullWidth
                      required
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ width: "50%", backgroundColor: "#3963ae" }}
                      // onSubmit={this.handleSubmit}
                    >
                      Submit&nbsp;
                      <SendIcon></SendIcon>
                    </Button>
                  </ThemeProvider>
                </form>
              </Box>
            </Container>
          </Fragment>
        )}
      </div>
      {/* Button to show and hide the chat bot ui */}
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="primary"
          id="mainBtn"
          onClick={handleDemoClick}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={
              data.isDisplayed ? mainBtnStyleTrue.hide : mainBtnStyleFalse.hide
            }
          >
            <CloseIcon></CloseIcon>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={
              data.isDisplayed ? mainBtnStyleTrue.show : mainBtnStyleFalse.show
            }
          >
            <ChatBubbleIcon></ChatBubbleIcon>&nbsp;
          </Box>
        </Button>
      </ThemeProvider>
      {/* Code for bot messages ends */}
    </Fragment>
  );
};

export default Bot;
