import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./signup.css";
import { saveToken } from "../../utility/auth/auth";

const SignUp = () => {
  const data: any = useActionData();
  const navigation = useNavigation();

  return (
    <Container component="main" maxWidth="xs">
      <Box className="outer">
        <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
          Sign In
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Form method="POST">
            <TextField
              label="Email"
              margin="normal"
              fullWidth
              id="email"
              name="email"
              helperText="Please enter your email Id"
              variant="standard"
            />
            <TextField
              label="Name"
              margin="normal"
              fullWidth
              id="name"
              name="name"
              helperText="Please enter your name"
              variant="standard"
            />
            <TextField
              label="Password"
              margin="normal"
              fullWidth
              id="password"
              name="password"
              type="password"
              helperText="Please enter your password"
              variant="standard"
            />
            <Typography textAlign="right" variant="subtitle2">
              User already ? <Link to="/login">Login</Link>
            </Typography>
            <Typography variant="subtitle2" color="error">
              {data?.message}
            </Typography>
            <Button
              sx={{
                width: "50%",
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                marginTop: 6,
              }}
              variant="contained"
              type="submit"
              disabled={navigation.state === "loading"}
            >
              {navigation.state === "loading" ? "Signin In..." : "Signin"}
            </Button>
          </Form>
        </Box>
      </Box>
    </Container>
  );
};
export default SignUp;

export const signUpAction = async ({ request }: any) => {
  const data = await request.formData();
  let user = {
    email: data.get("email"),
    password: data.get("password"),
    name: data.get("name"),
  };

  let res = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  let response = await res.json();
  if (response.status === 404) {
    return response;
  }
  saveToken(response.user.token);
  return redirect("/item");
};
