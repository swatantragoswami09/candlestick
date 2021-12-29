import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyle = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./1267681.jpg)    ",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    // height: "100vh",
  },
  bannerContent: {
    height: 450,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "50%",
    flexDirection: "column",
    justifyContent: "center",
    // textAlign: "center",
  },
}));
function Banner() {
  const classes = useStyle();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Lover
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Join the first Indian crypto exchange <br />
            Buy and Sell Crypto
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
