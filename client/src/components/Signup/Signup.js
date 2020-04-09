import React, { Fragment } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import useStyles from "../BasicStyles/BasicStyles";
import theme from "./../Themes/themeForButtonFieldRadius";
import { ThemeProvider } from "@material-ui/core/styles";
import SecurityIcon from "@material-ui/icons/Security";
import Axios from "axios";
import { signUpUrl, validateOtpUrl } from "../Urls/url";
import spinner from "./../../images/lg.rotating-balls-spinner.gif";

const Signup = props => {
  const classes = useStyles();

  const intitialState = {
    email: "",
    password: "",
    loading: false,
    otp: "",
    isOtpDisplayed: false,
    firstName: "",
    lastName: "",
  };

  const [data, setData] = React.useState(intitialState);

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  // Function to handle submit request
  const handleSubmit = event => {
    event.preventDefault();

    setData({
      ...data,
      loading: true,
    });

    // To get difference in timezones
    const tz = new Date().getTimezoneOffset();
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("doj", Date.now());
    formData.append("tz", tz);

    Axios.post(signUpUrl, formData)
      .then(user => {
        setData({
          ...data,
          loading: false,
          isOtpDisplayed: true,
        });
        props.noty.success("Signed up Successfully");
      })
      .catch(err => {
        setData({
          ...data,
          loading: false,
          isOtpDisplayed: false,
        });
        props.noty.error(err.response.data.err);
      });
  };

  // Function to validate otp
  const handleOtpValidation = () => {
    setData({
      ...data,
      loading: true,
    });

    const formData = new FormData();
    formData.append("otp", data.otp);
    formData.append("email", data.email);
    // To get difference in timezones
    const tz = new Date().getTimezoneOffset();
    formData.append("tz", tz);

    Axios.post(validateOtpUrl, formData)
      .then(otp => {
        setData({
          ...data,
          loading: false,
          isOtpDisplayed: false,
        });
        props.noty.success("Otp Verified Successfully");
        props.history.push("/login");
      })
      .catch(err => {
        setData({
          ...data,
          loading: false,
          isOtpDisplayed: true,
        });
        props.noty.error(err.response.data.err);
      });
  };

  // To handle  when enter is pressed
  const handleEnterPress = event => {
    if (event.keyCode === 13) {
      data.otp ? handleOtpValidation(event) : handleSubmit(event);
    }
  };

  return (
    <Fragment>
      <Container maxWidth="sm" className={`${classes.mt100} ${classes.my4}`}>
        {data.loading ? (
          <div className={`${classes.mt4} ${classes.textCenter}`}>
            <img src={spinner} alt="" />
          </div>
        ) : (
          <Box
            borderColor="primary.main"
            border={1}
            px="3.5rem"
            pb="2rem"
            boxShadow={3}
          >
            <Typography
              variant="h4"
              className={`${classes.bold} ${classes.my4}`}
            >
              Signup Page
            </Typography>

            <form
              action=""
              onSubmit={handleSubmit}
              onKeyDown={handleEnterPress}
            >
              <ThemeProvider theme={theme}>
                <Box display="flex" className={`${classes.mb4}`}>
                  <TextField
                    label="Enter First Name"
                    variant="outlined"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="Enter Last Name"
                    variant="outlined"
                    name="lastName"
                    className={`${classes.ml4}`}
                    value={data.lastName}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
                <TextField
                  className={`${classes.mb4}`}
                  label="Enter Email"
                  variant="outlined"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  type="password"
                  className={data.isOtpDisplayed ? `${classes.mb4}` : ""}
                  label="Enter Password"
                  variant="outlined"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  fullWidth
                />
                {data.isOtpDisplayed ? (
                  <TextField
                    type="text"
                    className={`${classes.mb4}`}
                    label="Enter otp"
                    variant="outlined"
                    name="otp"
                    value={data.otp}
                    onChange={handleChange}
                    fullWidth
                  />
                ) : (
                  ""
                )}

                {!data.isOtpDisplayed && (
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={handleSubmit}
                    className={data.isOtpDisplayed ? "" : classes.mt4}
                  >
                    Submit&nbsp;
                    <SendIcon></SendIcon>
                  </Button>
                )}
                {data.isOtpDisplayed ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    type="button"
                    // className={`${classes.ml4}`}
                    onClick={handleOtpValidation}
                  >
                    Validate Otp{"   "}
                    <SecurityIcon></SecurityIcon>
                  </Button>
                ) : (
                  ""
                )}
              </ThemeProvider>
            </form>
          </Box>
        )}
      </Container>
    </Fragment>
  );
};

export default Signup;
