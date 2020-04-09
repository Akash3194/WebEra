import React, { useEffect, Fragment } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import AdbIcon from "@material-ui/icons/Adb";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Avatar, Box } from "@material-ui/core";
import basicStyles from "../BasicStyles/BasicStyles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import Axios from "axios";
import { logout } from "./../Urls/url";
import spinner from "./../../images/lg.rotating-balls-spinner.gif";
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes" });

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const classes2 = basicStyles();
  const [open, setOpen] = React.useState(false);

  const initialState = {
    profileImage: "",
    user: {},
    loading: false,
  };

  const [data, setData] = React.useState(initialState);

  useEffect(() => {
    if (ls.get("user")) {
      const user = ls.get("user");
      setData({
        ...data,
        user,
        profileImage: user.dpdet.name,
      });
    } else {
      setData({
        ...data,
        loading: true,
      });
      Axios.get(`/user/${props.match.params.userId}/userProfile`)
        .then(user => {
          setData({
            loading: false,
            user: user.data.user,
            profileImage: user.data.user.dpdet.name,
          });
        })
        .catch(err => {
          setData({
            loading: false,
          });
        });
    }
  }, [props.match.params.userId]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    Axios.post(logout).then(() => {
      // localStorage.removeItem("user");
      ls.removeAll();
      props.noty.success("Logged out successfully");
      props.history.push("/");
    });
  };
  return (
    <Fragment>
      {data.loading ? (
        <div className={`${classes.mt4} ${classes.textCenter}`}>
          <img src={spinner} alt="" />
        </div>
      ) : (
        <div
          className={classes.root}
          onMouseEnter={handleDrawerOpen}
          onMouseLeave={handleDrawerClose}
        >
          <CssBaseline />

          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <Box display="flex" justifyContent="center" ml={2}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Avatar
                      alt={data.user.firstName + " " + data.user.lastName}
                      src={data.profileImage}
                      className={open ? `${classes2.profileImage}` : ""}
                    />
                  </ListItemIcon>
                </ListItem>
              </List>
            </Box>
            <Divider />
            <List>
              <Link
                to={`/user/${props.match.params.userId}/userProfile`}
                className={classes2.aRemoveDefault}
              >
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon></PersonIcon>
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </ListItem>
              </Link>
              <Divider />
              <Link
                to={`/user/${props.match.params.userId}/myChatbots`}
                className={classes2.aRemoveDefault}
              >
                <ListItem button>
                  <ListItemIcon>
                    <AdbIcon></AdbIcon>
                  </ListItemIcon>
                  <ListItemText primary="My Chat Bots" />
                </ListItem>
              </Link>
              <Divider />
              <Link
                to={`/user/${props.match.params.userId}/pricing`}
                className={classes2.aRemoveDefault}
              >
                <ListItem button>
                  <ListItemIcon>
                    <AttachMoneyIcon></AttachMoneyIcon>
                  </ListItemIcon>
                  <ListItemText primary="Pricing" />
                </ListItem>
              </Link>
              <Divider />
              <ListItem
                button
                className={classes2.aRemoveDefault}
                onClick={handleLogout}
              >
                <ListItemIcon>
                  <ExitToAppIcon></ExitToAppIcon>
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
              <Divider />
            </List>
          </Drawer>
        </div>
      )}
    </Fragment>
  );
}
