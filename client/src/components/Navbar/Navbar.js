import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import {
  IconButton,
  Box,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 0.56,
    marginLeft: "10px",
  },
  nav: {
    color: "black !important",
    backgroundColor: "White",
  },
  navItem: {
    textAlign: "center",
    "&:hover": {
      color: "blue",
      cursor: "pointer",
      boxShadow: "inset 0 -2px 0 blue",
    },
  },
  aRemoveDefault: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: "blue",
      cursor: "pointer",
      // boxShadow: "inset 0 -2px 0 blue",
    },
  },
  textCenter: {
    textAlign: "center",
  },
}));

const Navbar = props => {
  const classes = useStyles();
  return (
    //   Navbar starts
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.nav}>
        <Toolbar>
          {/* <Container maxwidth="lg">
            <Typography variant="h6">Home</Typography>
          </Container> */}
          <Grid container spacing={3}>
            <Grid item xs={5} sm={4} md={7}>
              <Box display="flex" alignItems="center">
                <Box display={{ xs: "inline", sm: "none" }}>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    display="none"
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
                <Typography variant="h6" className={classes.title}>
                  <Link to="/" className={classes.aRemoveDefault}>
                    CHATEASY
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item md={5} sm={8} xs={7}>
              <Box
                display={{ xs: "none", sm: "flex" }}
                justifyContent="space-between"
              >
                {props.location.pathname === "/" && (
                  <a href="/#home" className={classes.aRemoveDefault}>
                    <Typography
                      variant="subtitle1"
                      className={classes.textCenter}
                    >
                      Home
                    </Typography>
                  </a>
                )}
                {props.location.pathname === "/" && (
                  <a href="/#about" className={classes.aRemoveDefault}>
                    <Typography
                      variant="subtitle1"
                      className={classes.textCenter}
                    >
                      Our Services
                    </Typography>
                  </a>
                )}
                {props.location.pathname === "/" && (
                  <a href="/#pricing" className={classes.aRemoveDefault}>
                    <Typography
                      variant="subtitle1"
                      className={classes.textCenter}
                    >
                      Pricing
                    </Typography>
                  </a>
                )}
                {props.location.pathname === "/" && (
                  <a href="/#contactus" className={classes.aRemoveDefault}>
                    <Typography
                      variant="subtitle1"
                      className={classes.textCenter}
                    >
                      Contact Us
                    </Typography>
                  </a>
                )}
                {props.location.pathname ===
                "/addbots/keyegwkleklrnrg32rn52n2lk3rn2lk3rnl3n2lr23lkn2lk2d" ? (
                  ""
                ) : (
                  <Box ml={props.location.pathname === "/" ? "0" : "auto"}>
                    <Link to="/login" className={classes.aRemoveDefault}>
                      <Button variant="outlined" color="primary" size="small">
                        <Typography
                          variant="button"
                          className={classes.textCenter}
                        >
                          Login
                        </Typography>
                      </Button>
                    </Link>
                    <Link
                      to="/signup"
                      className={`${classes.aRemoveDefault} ${classes.ml1}`}
                    >
                      <Button variant="contained" color="primary" size="small">
                        <Typography
                          variant="button"
                          className={classes.textCenter}
                        >
                          Sign up
                        </Typography>
                      </Button>
                    </Link>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
    // Navbar ends
  );
};

export default Navbar;
