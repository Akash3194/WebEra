import React, { Fragment } from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import useStyles from "../BasicStyles/BasicStyles";
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes" });

const PriceBox = ({
  mainHeading,
  subText,
  points,
  price,
  btnText,
  props,
  purchtype,
}) => {
  const classes = useStyles();

  const purchaseBot = event => {
    event.preventDefault();
    if (ls.get("user")) {
      props.history.push({
        pathname: `/user/${props.match.params.userId}/subscription/${purchtype}`,
        state: { price },
      });
      // props.noty.success("you can buy bot");
    } else {
      props.props.noty.error("Login to purchase the bot");
      props.props.history.push("/login");
    }
  };

  return (
    <Fragment>
      <Grid item sm={3} className={`${classes.bgWhite} `}>
        <Box boxShadow="2">
          <Box className={`price-heading`}>
            <Typography variant="h6">{mainHeading}</Typography>
            <Typography variant="body2" className={`${classes.mt1}`}>
              {subText}
            </Typography>
          </Box>
          <Box className={`${classes.mt4}`}>
            <span className="main-price">&#8377;{price}</span>
            <span className={`price-time`}>/mo</span>
          </Box>
          <Box className={`${classes.mt4}`}>
            {points.map((val, index) => {
              return (
                <Box
                  display="flex"
                  key={index}
                  className={`${classes.list} ${classes.mt1} ${classes.textCenter}`}
                  justifyContent="center"
                >
                  <Typography variant="subtitle2">{val.text}</Typography>
                </Box>
              );
            })}

            <button
              className={`btn1 btn-price ${classes.mt4}`}
              onClick={purchaseBot}
            >
              {btnText}
            </button>
          </Box>
        </Box>
      </Grid>
    </Fragment>
  );
};

export default PriceBox;
