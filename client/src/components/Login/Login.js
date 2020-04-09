import React, { Fragment } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import useStyles from "../BasicStyles/BasicStyles";
import theme from "./../Themes/themeForButtonFieldRadius";
import { ThemeProvider } from "@material-ui/core/styles";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { loginUrl } from "../Urls/url";
import Axios from "axios";
import spinner from "./../../images/lg.rotating-balls-spinner.gif";
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes" });

const Login = props => {
  const classes = useStyles();

  console.log(props);
  const initialState = {
    email: "",
    password: "",
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

    // To get difference in timezones
    const tz = new Date().getTimezoneOffset();
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("tz", tz);

    Axios.post(loginUrl, formData)
      .then(user => {
        setData({
          ...data,
          loading: false,
        });
        props.noty.success("Logged in successfully");
        ls.set("user", user.data);
        // localStorage.setItem("user", JSON.stringify(user.data));
        props.history.push(`/user/${user.data._id}/userProfile`);
      })
      .catch(err => {
        setData({
          ...data,
          loading: false,
        });
        props.noty.error(err.response.data.err);
      });
  };

  // To handle  when enter is pressed
  const handleEnterPress = event => {
    if (event.keyCode === 13) {
      handleSubmit(event);
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
            // borderColor="primary.main"
            // border={1}
            px="5rem"
            py="3rem"
            boxShadow={5}
          >
            <Typography
              variant="h4"
              className={`${classes.bold}  ${classes.textCenter}`}
            >
              Login Page
            </Typography>
            <form
              action=""
              onSubmit={handleSubmit}
              onKeyDown={handleEnterPress}
            >
              <ThemeProvider theme={theme}>
                <TextField
                  className={`${classes.my4}`}
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
                  type="password"
                  className={`${classes.mb4}`}
                  label="Enter Password"
                  variant="outlined"
                  name="password"
                  // value={this.state.password}
                  onChange={handleChange}
                  value={data.password}
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
                  Login&nbsp;
                  <SendIcon></SendIcon>
                </Button>

                <Typography
                  className={`${classes.mt4} blue-color`}
                  display="block"
                >
                  <Link to="/forgotPassword" style={{ textDecoration: "none" }}>
                    Forgot Password?
                  </Link>
                </Typography>
              </ThemeProvider>
            </form>
          </Box>
        )}
      </Container>
    </Fragment>
  );
};

export default Login;
