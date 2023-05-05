import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { Link } from "react-router-dom";
import { saveToken } from "../../utility/auth/auth";
import { store, userAction } from "../../store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  let data: any = useActionData();
  let submit = useSubmit();

  const HandleSubmit = (e: any) => {
    e.preventDefault();
    let form = new FormData();
    form.append("email", email);
    form.append("password", password);
    submit(form, { method: "post" });
    // => api
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box>
        <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
          Login
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Form onSubmit={HandleSubmit}>
            <TextField
              label="Email"
              margin="normal"
              fullWidth
              id="email"
              name="email"
              helperText="Please enter your email Id"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography textAlign="right" variant="subtitle2">
              New User ? <Link to="/signup">Signin</Link>
            </Typography>
            <Typography variant="subtitle2" color="error">
              {data?.message}
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "50%",
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                marginTop: 6,
              }}
              type="submit"
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting" ? "Logging In..." : "Login"}
            </Button>
          </Form>
        </Box>
      </Box>
    </Container>
  );
};
export default Login;

export const submitLoginAction = async ({ request }: any) => {
  const data = await request.formData();
  let user = {
    email: data.get("email"),
    password: data.get("password"),
  };

  let res = await fetch("http://localhost:5000/login", {
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
  store.dispatch(userAction.setUserDetails(response.user));
  return redirect("/item");
};
