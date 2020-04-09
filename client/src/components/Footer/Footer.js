import React, { Fragment } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    padding: "10px 10px",
  },
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Box className={classes.footer}>&copy; 2019 Chateasy.com</Box>
    </Fragment>
  );
};

export default Footer;
