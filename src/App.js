import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles } from "@material-ui/core/styles";

const App = () => {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "black",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/coins/:id" component={CoinPage} />
      </div>
    </BrowserRouter>
  );
};
export default App;
