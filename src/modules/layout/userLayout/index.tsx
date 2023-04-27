import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import Header from "../../header";
import { Outlet, useNavigation } from "react-router-dom";

const UserLayout = () => {
  const status: any = useNavigation();
  return (
    <Grid container>
      <Grid xs={12} item>
        <Header />
      </Grid>
      <Grid xs={12} item>
        {status.state === "loading" ? <CircularProgress /> : <Outlet />}
      </Grid>
    </Grid>
  );
};

export default UserLayout;
