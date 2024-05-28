import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LoginUser } from "../store/slice/auth";

const Login = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(LoginUser(formValues));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box>
        <Container sx={{ my: 4 }}>
          <Typography variant="h5" sx={{ my: 2, textAlign: "center" }}>
            Todo's
          </Typography>
          <form method="method" onSubmit={onSubmit}>
            <Stack spacing={2} sx={{ mb: 2 }}>
              <TextField
                placeholder="Enter Email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
              <TextField
                placeholder="Enter Password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
              <TextField
                placeholder="Enter Password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
              />
            </Stack>
            <Stack sx={{ textAlign: "end" }}>
              <Typography variant="caption">
                You have't any Account:
                <Link to={"/register"}> Register </Link>
              </Typography>{" "}
            </Stack>

            <Button type="submit" variant="contained" fullWidth>
              {" "}
              SingIn
            </Button>
          </form>
          <Stack sx={{ mt: 1 }}>
            <Typography variant="caption">
              Forgot Password:
              <Link to={"/forgot-pass"}> Reset Password </Link>
            </Typography>{" "}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Login;
