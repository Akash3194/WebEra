import React, { Fragment } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import useStyles from "../BasicStyles/BasicStyles";
import theme from "./../Themes/themeForButtonFieldRadius";
import { ThemeProvider } from "@material-ui/core/styles";
import SecurityIcon from "@material-ui/icons/Security";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Axios from "axios";
import { forgotPasswordUrl, validateOtpUrl, generateOtpUrl } from "../Urls/url";
import spinner from "./../../images/lg.rotating-balls-spinner.gif";

const ForgotPassword = props => {
  const classes = useStyles();

  const initialState = {
    email: "",
    password: "",
    password2: "",
    otp: "",
    isOtpVerified: false,
    isOtpSent: false,
    loading: false,
  };

  const [data, setData] = React.useState(initialState);

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    setData({
      ...data,
      loading: true,
    });

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    // To get difference in timezones
    const tz = new Date().getTimezoneOffset();
    formData.append("tz", tz);

    Axios.post(forgotPasswordUrl, formData)
      .then(user => {
        console.log(user);
        setData({
          ...data,
          loading: false,
        });
        props.noty.success(user.data.msg);
        props.history.push("/login");
      })
      .catch(err => {
        setData({
          ...data,
          loading: false,
        });
        props.noty.error(err.response.data.err);
      });
  };

  const handleOtpValidation = event => {
    event.preventDefault();
    setData({
      ...data,
      loading: true,
    });

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("otp", data.otp);
    // To get difference in timezones
    const tz = new Date().getTimezoneOffset();
    formData.append("tz", tz);

    Axios.post(validateOtpUrl, formData)
      .then(otp => {
        setData({
          ...data,
          isOtpVerified: true,
          isOtpSent: false,
          otp: "",
        });
        props.noty.success("Otp verified successfully");
      })
      .catch(err => {
        setData({
          ...data,
          isOtpVerified: false,
          isOtpSent: true,
          otp: "",
        });
        props.noty.error(err.response.data.err);
      });
  };

  const generateOtp = event => {
    event.preventDefault();
    if (data.email) {
      setData({
        ...data,
        loading: true,
      });
      const formData = new FormData();
      formData.append("email", data.email);
      // To get difference in timezones
      const tz = new Date().getTimezoneOffset();
      formData.append("tz", tz);

      Axios.post(generateOtpUrl, formData)
        .then(otp => {
          setData({
            ...data,
            isOtpSent: true,
            loading: false,
          });
          props.noty.success("Otp generated successfully");
        })
        .catch(err => {
          setData({
            ...data,
            isOtpSent: false,
            loading: false,
          });
          props.noty.error(err.response.data.err);
        });
    } else {
      props.noty.error("Please enter email");
    }
  };

  // To handle  when enter is pressed
  const handleEnterPress = event => {
    if (event.keyCode === 13) {
      // if (data.email) {
      //   generateOtp();
      // }
      data.isOtpVerified
        ? handleSubmit(event)
        : data.isOtpSent
        ? handleOtpValidation(event)
        : generateOtp(event);
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
              Forgot Password Page
            </Typography>

            <div onKeyDown={handleEnterPress}>
              <ThemeProvider theme={theme}>
                <TextField
                  className={`${classes.mb4}`}
                  label="Enter Email"
                  variant="outlined"
                  name="email"
                  value={data.email}
                  type="email"
                  onChange={handleChange}
                  required
                  disabled={
                    data.isOtpVerified ? data.isOtpVerified : data.isOtpSent
                  }
                  fullWidth
                />
                {data.isOtpVerified ? (
                  <Fragment>
                    <TextField
                      type="password"
                      className={`${classes.mb4}`}
                      label="Enter New Password"
                      variant="outlined"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      type="password"
                      label="Confirm New Password"
                      variant="outlined"
                      name="password2"
                      value={data.password2}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Fragment>
                ) : (
                  ""
                )}
                {data.password === data.password2 ? (
                  ""
                ) : (
                  <Box color="secondary.main" mt="0.5rem">
                    Passwords are not same
                  </Box>
                )}
                {data.isOtpSent ? (
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

                {(data.isOtpVerified ? (
                  data.isOtpSent
                ) : (
                  !data.isOtpSent
                )) ? (
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={generateOtp}
                  >
                    <SecurityIcon></SecurityIcon>&nbsp; Generate Otp
                  </Button>
                ) : (
                  ""
                )}

                {data.isOtpVerified ? (
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={handleSubmit}
                    className={data.isOtpSent ? "" : classes.mt4}
                    disabled={data.password === data.password2 ? false : true}
                  >
                    <RotateLeftIcon></RotateLeftIcon> &nbsp;Reset Password
                  </Button>
                ) : (
                  ""
                )}
                {data.isOtpSent ? (
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={handleOtpValidation}
                  >
                    <SecurityIcon></SecurityIcon>
                    &nbsp;Verify Otp
                  </Button>
                ) : (
                  ""
                )}
              </ThemeProvider>
            </div>
          </Box>
        )}
      </Container>
    </Fragment>
  );
};

export default ForgotPassword;
