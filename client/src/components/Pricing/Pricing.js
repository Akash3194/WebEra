import React, { Fragment } from "react";
import { Container, Typography, Box } from "@material-ui/core";
import useStyles from "../BasicStyles/BasicStyles";
import PriceBox from "./PriceBox";

const Pricing = props => {
  const classes = useStyles();
  return (
    <Fragment>
      <Container
        maxWidth="md"
        className={`${classes.boxSection} ${classes.textCenter}`}
        id="pricing"
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h3"> Pricing</Typography>
          <Box style={{ width: "60%" }} mx="auto">
            <Typography variant="h6" className={`${classes.mt4} grey-color`}>
              Quickly build an effective pricing table for your potential
              customers with this layout. It's bullt with default Material-Ul
              components with little customization.
            </Typography>
          </Box>

          <Box
            display="flex"
            className={`${classes.mt6}`}
            justifyContent="space-between"
            textAlign="center"
          >
            <PriceBox
              mainHeading="Basic"
              points={[
                { text: "Single Bot" },
                { text: "10 Days Trial" },
                { text: "20 FAQ Limit" },
                { text: "Very Low Storage" },
              ]}
              price="0"
              btnText="Use"
              props={props}
              purchtype={"thirty"}
            />
            <PriceBox
              mainHeading="Pro"
              subText="Most Popular"
              points={[
                { text: "Unlimited Bots" },
                { text: "Unlimited Users" },
                { text: "2000 FAQS" },
                { text: "Unlimited Data Storage" },
              ]}
              price="5999"
              btnText="Get Started"
              props={props}
              purchtype={"sixty"}
            />
            <PriceBox
              mainHeading="Enterprise"
              points={[
                { text: "Unlimited Bots" },
                { text: "Unlimited Users" },
                { text: "Unlimited FAQS" },
                { text: "Unlimited Data Storage" },
              ]}
              price="8999"
              btnText="Get Started"
              props={props}
              purchtype={"ninty"}
            />
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Pricing;
