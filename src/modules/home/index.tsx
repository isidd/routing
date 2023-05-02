import React from "react";
import { Container, Box, Typography } from "@mui/material";
import LightBulbIcon from "@mui/icons-material/Lightbulb";
import { Link } from "react-router-dom";

const Home = () => (
  <Container maxWidth="lg">
    <Box sx={{ my: 4 }} textAlign="center">
      <Typography variant="h4" component="h1" gutterBottom>
        This is a demo project for React training session..!
      </Typography>
      <Typography sx={{ mt: 6, mb: 3 }}>
        <LightBulbIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        Tip: Keep Reading documentation
      </Typography>
      <Typography variant="body1" color="text.secondary">
        React
      </Typography>
      <Typography variant="body1" color="text.secondary">
        React Router
      </Typography>
      <Typography variant="body1" color="text.secondary">
        TypeScript
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Redux
      </Typography>
      <Typography variant="body1" color="text.secondary">
        .
      </Typography>
      <Typography variant="body1" color="text.secondary">
        .
      </Typography>
      <Typography variant="body1" color="text.secondary">
        .
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Formik
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 30 }}
      >
        {"Copyright © "}
        <Link color="inherit" to="https://mui.com/">
          Nagarro React Training
        </Link>{" "}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  </Container>
);
export default Home;
