import React from "react";
import {
  Card,
  Box,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import useStyles from "../BasicStyles/BasicStyles";

const CardCustom = ({ cardImage, cardColor, cardHeading, cardText }) => {
  const classes = useStyles();
  return (
    <Box className={`${classes.heightFluid} ${classes.center}`}>
      <Card className={`${classes.root} ${classes.zeroRadius}`}>
        <CardActionArea className={classes.textCenter}>
          <CardMedia
            className={classes.media}
            image={cardImage}
            component="img"
          />
          <CardContent style={{ color: cardColor }}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="h2"
              className={classes.cardItem}
            >
              {cardHeading}
            </Typography>
            <Typography variant="body2" display="block">
              {cardText}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default CardCustom;
