import React from "react";

import Items from "./modules/items";
import Home from "./modules/home";
import Login from "./modules/login";
import { Route, Switch } from "react-router-dom";
import { Grid } from "@mui/material";
import Header from "./modules/header";
import ItemDetails from "./modules/itemDetails";

const App: React.FC = (): React.ReactElement => {
  return (
    <Grid container>
      <Grid xs={12} item>
        <Header />
      </Grid>
      <Grid xs={12} item>
        <Switch>
          <Route path="/home" exact component={() => <Home />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/item" exact component={() => <Items />} />
          <Route path="/item/:id" exact component={() => <ItemDetails />} />
        </Switch>
      </Grid>
    </Grid>
  );
};

export default App;
