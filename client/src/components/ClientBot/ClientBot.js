import React, { Fragment, useRef, useEffect } from "react";
import { Button, Box, TextField, Typography } from "@material-ui/core";
import theme from "./../Themes/themeForButtonFieldRadius";
import { ThemeProvider } from "@material-ui/core/styles";
import useStyles from "../BasicStyles/BasicStyles";
import SendIcon from "@material-ui/icons/Send";
import Axios from "axios";
import loadingGif from "./../../images/loader.gif";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

let sessionId = "";

const ClientBot = props => {
  let customBotUrl = `/comp/${props.match.params.compId}/bot/${props.match.params.botId}`;

  // Ref for scroll
  const myRef = useRef(null);

  // Ref for input focus
  const inputRef = useRef(null);

  const classes = useStyles();

  const loadingState = {
    loading: false,
  };

  const botState = [
    {
      userMsg: "",
      botMsg: [["Hi, I am neesha.", "I can help you with our services"]],
    },
  ];

  const [loading, setLoading] = React.useState(loadingState);

  const [botMessages, setBotMessages] = React.useState(botState);

  const [userMessage, setUserMessage] = React.useState({
    userMsg: "",
  });

  // Disabled state
  const [disabledState, setDisabled] = React.useState({
    isDisabled: false,
  });

  // To trigger scroll whenever a new message is generated
  useEffect(() => {
    myRef.current.scrollIntoView({ behavior: "smooth" });
    inputRef.current.focus();
  }, [loadingState]);

  // To generate a session id when component mounts
  useEffect(() => {
    const possibleCharacters = "qwertyuiopasdfghjklzxcvbnm1234567890-";

    for (let i = 0; i < 25; i++) {
      sessionId +=
        possibleCharacters[
          Math.floor(Math.random() * possibleCharacters.length)
        ];
    }
    console.log(sessionId);
  }, []);

  // To store textfield value in state
  const handleChange = event => {
    setUserMessage({
      userMsg: event.target.value,
    });
  };

  // To handle message response from server
  const handleMessages = () => {
    const userMsg = userMessage.userMsg;
    // Check if user message is null or not
    if (!userMsg || userMsg === "null") {
      props.noty.error("Please enter a valid message");
    } else {
      setLoading({
        loading: true,
      });
      // To diable button and text field
      setDisabled({
        isDisabled: true,
      });

      // Array in which bot data will be stored
      const botMsg = [];
      // Message with response that will be stored
      const messages = {
        botMsg: botMsg,
        userMsg,
      };
      // Adding to bot message state so that first user message can be shown.
      botMessages.push(messages);
      setBotMessages([...botMessages]);

      const botServerData = {
        sessionId,
        userMsg,
      };

      // Setting user message to blank
      setUserMessage({
        userMsg: "",
      });

      console.log(sessionId);
      // To send user message and receive response from bot
      Axios.post("https://botera-backend-668b0.firebaseapp.com/sendMsg", {
        session_id: sessionId, //sessionId
        message: userMsg.toString(), //userMsg
      })
        .then(data => {
          // Again enabling the text fields
          setDisabled({
            isDisabled: false,
            loading: false,
          });
          // Storing bot message by splitting it into parts
          let botMessage = data.data[0].text.toString();
          botMessage = botMessage.split(/\\r\\n|\\n|\\r/);

          botMsg.push(botMessage);
          // If in response buttons are there
          let botButtons = [];
          if (data.data[0].buttons) {
            for (let i = 0; i < data.data[0].buttons.length; i++) {
              botButtons.push(data.data[0].buttons.title);
            }
            botMsg.push(botButtons);
          }

          // Setting bot message response in bot state
          botMessages[botMessages.length - 1].botMsg = botMsg;
          setBotMessages([...botMessages]);
        })
        .catch(err => {
          setDisabled({
            isDisabled: false,
            loading: false,
          });
        });
    }
  };

  // To handle bot response when enter is clicked
  const handleEnterPress = event => {
    if (event.keyCode === 13) {
      handleMessages();
    }
  };

  return (
    <Fragment>
      {/* Code for bot messages starts */}

      <div>
        {/* Main container to hold the messages */}
        <div className="bot-container-pallet">
          <ChatBubbleIcon></ChatBubbleIcon>
          <Typography variant="h6" className={`${classes.pl4}`}>
            NEESHA
          </Typography>
          {/* <CloseIcon
            className={`close-icon`}
            onClick={handleClose}
            style={{ display: !closeState ? "none" : "inline" }}
          ></CloseIcon> */}
        </div>
        <Box className="msg-container" pt="80px">
          {/* Iterating through all the messages and displaying in frontend */}
          {botMessages.map((val, index) => {
            return (
              <Fragment key={index}>
                <Box
                  id="msg-container-user"
                  display="flex"
                  justifyContent="flex-end"
                >
                  {/* If user msg is there then create div otherwise not */}
                  {val.userMsg && (
                    <Box className={`msg-user ${classes.mt4} `}>
                      {val.userMsg}
                    </Box>
                  )}
                </Box>
                {/* If state have bot message from server then generate it's container */}
                {val.botMsg.length > 0 ? (
                  <Box
                    id="msg-container-bot"
                    display="flex"
                    flexDirection={
                      val.botMsg.length > 1
                        ? "column"
                        : val.botMsg[0].length > 1
                        ? "column"
                        : ""
                    }
                    justifyContent="flex-start"
                  >
                    {val.botMsg[0].map((botmessage, index) => {
                      return (
                        <Box
                          key={index}
                          className={`${
                            val.botMsg.length > 1 ? "msg-bot1" : "msg-bot"
                          } ${index == 0 ? classes.mt4 : classes.mt1}`}
                        >
                          {botmessage}
                        </Box>
                      );
                    })}

                    {/* If in state botmessage have buttons as response then generating it's container */}
                    {val.botMsg[1]
                      ? val.botMsg[1].map((val1, index1) => {
                          return (
                            <Box
                              key={index1}
                              textAlign="center"
                              color="primary.main"
                              className={`text-primary response-button ${
                                index1 === val.botMsg[1].length - 1
                                  ? `server-btn-response-last ${classes.mb4}`
                                  : "server-btn-response"
                              }`}
                            >
                              {val1}
                            </Box>
                          );
                        })
                      : ""}
                  </Box>
                ) : loading.loading ? (
                  <img src={loadingGif} alt="" style={{ height: "50px" }} />
                ) : (
                  ""
                )}
              </Fragment>
            );
          })}
          <div ref={myRef} style={{ marginTop: "105px" }}></div>
        </Box>
        {/* Div for input and send button */}
        <ThemeProvider theme={theme}>
          <Box className={`msg-send2`} display="flex" mt="1.5rem">
            <TextField
              variant="outlined"
              color="primary"
              label="Enter message"
              fullWidth
              id="message"
              onChange={handleChange}
              onKeyDown={handleEnterPress}
              value={userMessage.userMsg}
              autoFocus
              inputRef={inputRef}
              disabled={disabledState.isDisabled}
              autoFocus={!disabledState.isDisabled && true}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleMessages}
              disabled={disabledState.isDisabled}
            >
              <SendIcon></SendIcon>
            </Button>
          </Box>
        </ThemeProvider>
      </div>

      {/* Code for bot messages ends */}
    </Fragment>
  );
};

export default ClientBot;
