import React, { Fragment } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import Axios from "axios";
import spinner from "./../../images/lg.rotating-balls-spinner.gif";
import useStyles from "../BasicStyles/BasicStyles";
import theme from "./../Themes/themeForButtonFieldRadius";
import { ThemeProvider } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { addbots } from "./../Urls/url";

const AddBot = props => {
  console.log(addbots);
  const classes = useStyles();

  const initialState = {
    botUrl: "",
    projectId: "",
    keyFieldName: "",
  };

  const [data, setData] = React.useState(initialState);

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  // To handle  when enter is pressed
  const handleEnterPress = event => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("botUrl", data.botUrl);
    formData.append("projectId", data.projectId);
    formData.append("keyFilename", data.keyFieldName);

    Axios.post(addbots, formData)
      .then(res => {
        console.log(res);
        props.noty.success(res.data.msg);
      })
      .catch(err => {
        console.log(err);
        // props.noty.error(err.response.data.err);
      });
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
              Add Bot Page
            </Typography>
            <form
              action=""
              onSubmit={handleSubmit}
              onKeyDown={handleEnterPress}
            >
              <ThemeProvider theme={theme}>
                <TextField
                  className={`${classes.my4}`}
                  label="Enter Bot Url"
                  variant="outlined"
                  name="botUrl"
                  // value={this.state.username}
                  onChange={handleChange}
                  fullWidth
                  required
                  value={data.botUrl}
                />
                <TextField
                  className={`${classes.mb4}`}
                  label="Enter Project Id"
                  variant="outlined"
                  name="projectId"
                  // value={this.state.password}
                  onChange={handleChange}
                  value={data.projectId}
                  fullWidth
                  required
                />
                <TextField
                  className={`${classes.mb4}`}
                  label="Enter Key Field Name"
                  variant="outlined"
                  name="keyFieldName"
                  // value={this.state.password}
                  onChange={handleChange}
                  value={data.keyFieldName}
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
        )}
      </Container>
    </Fragment>
  );
};
export default AddBot;
