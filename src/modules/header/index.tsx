import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./index.css";

const Header = () => {
  const history = useLocation();

  return (
    <Grid container>
      <Grid xs={12} className="nav" item>
        <NavLink
          to={"/home"}
          className={
            history.pathname === "/home" ? "nav-item-active" : "nav-item"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/item"
          className={
            history.pathname === "/item" ? "nav-item-active" : "nav-item"
          }
        >
          Item
        </NavLink>
        <NavLink
          to="/login"
          className={
            history.pathname === "/login" ? "nav-item-active" : "nav-item"
          }
        >
          Login
        </NavLink>
      </Grid>
    </Grid>
  );
};

export default Header;
