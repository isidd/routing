import React from "react";
import UserLayout from "../../modules/layout/userLayout";
import ErrorScreen from "../../modules/Error";
import Home from "../../modules/home";
import Login from "../../modules/login";
import Items, { getItems } from "../../modules/items";
import AdminLayout from "../../modules/layout/adminLayout";
import ItemDetails, { getItemsDetails } from "../../modules/itemDetails";

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
      },
      {
        path: "/item",
        element: <Items />,
        loader: getItems,
      },
      {
        path: "/item/:id",
        element: <ItemDetails />,
        loader: getItemsDetails,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{}],
  },
];
