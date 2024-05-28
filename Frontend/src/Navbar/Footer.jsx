import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../store/slice/auth";

const Footer = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#1976D2", width: "100vw", color: "white" }}>
        <Container>
          <Grid container sx={{ py: 3 }}>
            <Grid item xs={12} sm={12} md={3} lg={4} xl={4}>
              <Stack>
                <Typography variant="h4">Todo</Typography>
                <Typography>Shourya's Todo</Typography>
                <Typography>Bihar India 800001</Typography>
                <Typography>+91 748 834 8576</Typography>
                <Typography>shouryasinha.c@gmail.com</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={4} xl={4}>
              <Stack sx={{ textAlign: "center" }} spacing={0.7}>
                <Typography variant="h5">Shortcuts Links</Typography>
                <Stack sx={{ textAlign: "center" }} spacing={0.7}>
                  <Link to={"/"} style={{ color: "white" }}>
                    {" "}
                    <Typography>Home</Typography>
                  </Link>
                  <Link to={"/profile"} style={{ color: "white" }}>
                    {" "}
                    <Typography>My Profile</Typography>
                  </Link>
                  <Link to={"/add-task"} style={{ color: "white" }}>
                    {" "}
                    <Typography>Add Task</Typography>
                  </Link>
                  <Link to={"/complete"} style={{ color: "white" }}>
                    {" "}
                    <Typography >View Completed Task</Typography>
                  </Link>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={4} xl={4}>
              <Stack sx={{ textAlign: "center" }} spacing={0.7}>
                <Typography >Authentication Links</Typography>
                <Button to={"/login"} onClick={()=> handleLogout()}>
                  {" "}
                  <Typography style={{ color: "white" }}>SignOut</Typography>
                </Button>
                <Link to={"/register"}>
                  {" "}
                  <Typography style={{ color: "white" }}>Register</Typography>
                </Link>
                <Link to={"/reset-pass"}>
                  {" "}
                  <Typography style={{ color: "white" }}>Reset Password</Typography>
                </Link>
                <Link to={"/forgot-pass"}>
                  {" "}
                  <Typography style={{ color: "white" }}>Forgot Password</Typography>
                </Link>
               
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center" }}>
            <p>Copyright &copy; 2024</p>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
