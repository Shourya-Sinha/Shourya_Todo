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
import { RegisterUser } from "../store/slice/auth";

const Register = () => {

  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    userName: "",
    phoneNo: "",
    email: "",
    gender: "",
    password:'',
    confirmPassword:'',
  });

  const handleChange =(e) =>{
    const {name,value} = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = async (e) =>{
    e.preventDefault();

    try {
      dispatch(RegisterUser(formValues));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box>
        <Container sx={{ my: 4 }}>
          <Stack spacing={2}>
          <Typography variant="h5" sx={{ my: 2 ,textAlign:'center'}}>
            Todo's
          </Typography>
          <form method="method" onSubmit={onSubmit}>

        <Stack spacing={2}>

        
            <Stack direction={"row"} spacing={2}>
              <TextField
                placeholder="Enter your name"
                name="userName"
                type="text"
                onChange={handleChange}
                value={formValues.name}
                sx={{ flexGrow: 1 }}
              />
              <TextField
                placeholder="Enter your phoneNo"
                name="phoneNo"
                onChange={handleChange}
                value={formValues.phoneNo}
                sx={{ flexGrow: 1 }}
              />
            </Stack>

            <Stack direction={"row"} spacing={2}>
              <TextField
                placeholder="Enter your Email"
                name="email"
                onChange={handleChange}
                value={formValues.email}
                sx={{ flexGrow: 1 }}
                type="email"
              />
              <TextField
                placeholder="Enter Gender"
                name="gender"
                onChange={handleChange}
                value={formValues.gender}
                sx={{ flexGrow: 1 }}
                type="text"
              />
            </Stack>
            <Stack direction={"row"} spacing={2}>
              <TextField
                placeholder="Enter your Password"
                name="password"
                onChange={handleChange}
                value={formValues.password}
                sx={{ flexGrow: 1 }}
                type="password"
              />
              <TextField
                placeholder="Enter your Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                value={formValues.confirmPassword}
                sx={{ flexGrow: 1 }}
                type="password"
              />
            </Stack>
            <Stack sx={{ textAlign: "end" }}>
             
                <Typography variant="caption">
                  Already You have Account: 
                  <Link to={"/login"}> Login   </Link>
                </Typography>{" "}

            
            </Stack>
            <Button type="submit" variant="contained" fullWidth>
              Register
            </Button>
            </Stack>
            </form>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Register;
