import React from "react";
import { Grid } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import "./index.css";
import { isAuth, unAuthUser } from "../../utility/auth/auth";

const Header = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

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
        {isAuth() && (
          <NavLink
            to="/item"
            className={({ isActive }) =>
              isActive ? "nav-item-active" : "nav-item"
            }
          >
            Item
          </NavLink>
        )}
        {isAuth() ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-item-active" : "nav-item"
            }
            onClick={() => unAuthUser()}
          >
            Logouts
          </NavLink>
        ) : (
          <NavLink
            to={isLogin ? "/login" : "/signup"}
            className={({ isActive }) =>
              isActive ? "nav-item-active" : "nav-item"
            }
          >
            {isLogin ? "Login" : "Signup"}
          </NavLink>
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
