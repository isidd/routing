import React from "react";
import { Grid } from "@mui/material";
import Header from "../../header";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <Grid container>
      <Grid xs={12} item>
        <Header />
      </Grid>
      <Grid xs={12} item>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default UserLayout;
