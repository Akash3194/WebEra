import React, { Fragment } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EmailIcon from "@material-ui/icons/Email";
import useStyles from "../BasicStyles/BasicStyles";

const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiInputBase: {
      // Name of the rule
      input: {
        // Some CSS
        color: "white",
      },
    },
    MuiFormLabel: {
      root: {
        color: "white",
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: "white",
        borderRadius: "0",
      },
    },
    MuiButton: {
      root: {
        borderRadius: "0",
      },
    },
  },
});

const ContactUs = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Container
        maxWidth="xl"
        className={`${classes.noPadding} ${classes.contactUs}`}
        id="contactus"
      >
        <Grid container className={`${classes.contactUsContainerPadding}`}>
          <Grid item sm={3}></Grid>
          <Grid item sm={6}>
            <Typography variant="h4">Send us a Message</Typography>
            <form action="" className={`${classes.contactUsFormPadding}`}>
              <ThemeProvider theme={theme}>
                <TextField
                  label="Enter your name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  className={classes.mb4}
                />

                <TextField
                  label="Enter your email"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="email"
                  className={classes.mb4}
                />

                <TextField
                  label="Enter your phone number"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  type="number"
                  className={classes.mb4}
                />
                <TextField
                  label="Enter your message"
                  multiline
                  rows="4"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  className={classes.mb4}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ float: "right" }}
                >
                  Send&nbsp;
                  <SendIcon />
                </Button>
              </ThemeProvider>
            </form>
          </Grid>
          <Grid item sm={3} style={{ paddingLeft: "100px" }}>
            <Typography variant="h4">Contact details</Typography>
            <Box className={classes.contactUsFormPadding}>
              <Box className={`${classes.contacts} ${classes.mb4}`}>
                <PhoneAndroidIcon />
                &nbsp;&nbsp;&nbsp;8708979667
              </Box>
              <Box className={`${classes.contacts} ${classes.mb4}`}>
                <EmailIcon />
                &nbsp;&nbsp;&nbsp;xyz@gmail.com
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ContactUs;
