import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Header from "../../header";
import { Outlet, useNavigate } from "react-router-dom";
import {
  getToken,
  isUnauthorized,
  unAuthUser,
} from "../../../utility/auth/auth";
import { store, userAction } from "../../../store";

const UserLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      let token: string = getToken() ?? "";
      let res = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      let response = await res.json();
      if (response.status === 404) {
        return response;
      }
      if (isUnauthorized(response.status)) {
        unAuthUser();
        return navigate("/login");
      }
      store.dispatch(userAction.setUserDetails(response));
    })();
  }, []);
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
