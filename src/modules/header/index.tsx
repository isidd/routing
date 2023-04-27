import React from "react";
import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./index.css";

const Header = () => {
  return (
    <Grid container>
      <Grid xs={12} className="nav" item>
        <NavLink
          to={"/home"}
          className={({ isActive }) =>
            isActive ? "nav-item-active" : "nav-item"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/item"
          className={({ isActive }) =>
            isActive ? "nav-item-active" : "nav-item"
          }
        >
          Item
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "nav-item-active" : "nav-item"
          }
        >
          Login
        </NavLink>
      </Grid>
    </Grid>
  );
};

export default Header;
