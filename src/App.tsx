import React, { useEffect } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Grid } from "@mui/material";
import { Routes } from "./config/routes/routes";

const App: React.FC = (): React.ReactElement => {
  const routes = createBrowserRouter(Routes);

  return (
    <Grid container>
      <RouterProvider router={routes} />
    </Grid>
  );
};

export default App;
