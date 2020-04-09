import React, { Fragment } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import useStyles from "../BasicStyles/BasicStyles";
import PersonIcon from "@material-ui/icons/Person";

const ChatBots = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Box
        className={`${classes.ml150} ${classes.mt100}`}
        style={{ width: "88%" }}
      >
        <Grid container spacing={3}>
          <Grid item sm={4}>
            <Box
              border={1}
              borderColor="primary.main"
              //   px="2rem"
              py="1rem"
              px="2rem"
              boxShadow="3"
              textAlign="center"
            >
              <Typography variant="h6">Demo Chat Bot</Typography>
              <Box display="flex" justifyContent="space-between" mt="1.25rem">
                <Button variant="outlined" color="primary">
                  {" "}
                  test
                </Button>
                <Button variant="outlined" color="primary">
                  {" "}
                  test
                </Button>
                <Button variant="outlined" color="primary">
                  {" "}
                  test
                </Button>
              </Box>
            </Box>
            <Box
              border={1}
              borderColor="primary.main"
              //   px="2rem"
              py="1rem"
              px="2rem"
              boxShadow="3"
              textAlign="center"
              mt="2rem"
            >
              <Typography variant="h6">Demo Chat Bot</Typography>
              <Box display="flex" justifyContent="space-between" mt="1.25rem">
                <Button variant="outlined" color="primary">
                  {" "}
                  test
                </Button>
                <Button variant="outlined" color="primary">
                  {" "}
                  test
                </Button>
                <Button variant="outlined" color="primary">
                  {" "}
                  test
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={7} className={classes.ml4}>
            <Box
              border={1}
              borderColor="primary.main"
              //   py="1rem"
              //   px="2rem"
              boxShadow="3"
              textAlign="center"
              display="flex"
              style={{ maxHeight: "550px" }}
            >
              <List
                style={{
                  borderRight: "1px solid rgb(63, 81, 181)",
                  overflowY: "auto",
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon></PersonIcon>
                  </ListItemIcon>
                  <ListItemText>User1</ListItemText>
                </ListItem>
                <Divider></Divider>
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon></PersonIcon>
                  </ListItemIcon>
                  <ListItemText>User2</ListItemText>
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon></PersonIcon>
                  </ListItemIcon>
                  <ListItemText>User3</ListItemText>
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon></PersonIcon>
                  </ListItemIcon>
                  <ListItemText>User4</ListItemText>
                </ListItem>
              </List>
              <Box style={{ width: "83%", overflowY: "auto" }}></Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default ChatBots;
