import React from "react";
import UserLayout from "../../modules/layout/userLayout";
import ErrorScreen from "../../modules/Error";
import Home from "../../modules/home";
import Login, { submitLoginAction } from "../../modules/login";
import Items, { loadItems, submitItemAction } from "../../modules/items";
import AdminLayout from "../../modules/layout/adminLayout";
import ItemDetails from "../../modules/itemDetails";
import SignUp, { signUpAction } from "../../modules/signup";
import { getToken } from "../../utility/auth/auth";
import { json, redirect } from "react-router-dom";

export const Routes = [
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
        loader: () => {
          if (getToken()) return redirect("/item");
          return json({ status: 200 });
        },
        action: submitLoginAction,
      },
      {
        path: "signup",
        element: <SignUp />,
        action: signUpAction,
      },
      {
        path: "/item",
        element: <Items />,
        loader: loadItems,
        action: submitItemAction,
      },
      {
        path: "/item/:id",
        element: <ItemDetails />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{}],
  },
];
