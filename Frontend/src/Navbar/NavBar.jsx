import React, { useEffect } from "react";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const token = useSelector((state) => state.auth.token);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   }
  // });
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ width: "100%" }}
        >
          <Stack>
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              <Typography variant="h6">Todo </Typography>{" "}
            </Link>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              {" "}
              <Typography variant="subtitle2" color="white">
                {" "}
                Home
              </Typography>{" "}
            </Link>
            <Link to={"/profile"} style={{ textDecoration: "none" }}>
              {" "}
              <Typography variant="subtitle2" color="white">
                {" "}
                Profile
              </Typography>{" "}
            </Link>
            {/* <Link to={"/cart"} style={{ textDecoration: "none" }}>
            {" "}
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography variant="subtitle2" color="white">
                {" "}
                Cart:
              </Typography>{" "}
              <Stack
                sx={{
                  width: "13px",
                  height: "13px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartItems.length}{" "} 
              </Stack>
            </Stack>
          </Link> */}
            <Link to={"/complete"} style={{ textDecoration: "none" }}>
              {" "}
              <Typography variant="subtitle2" color="white">
                {" "}
                Completed Task
              </Typography>{" "}
            </Link>
            <Link to={"/add-task"} style={{ textDecoration: "none" }}>
              {" "}
              <Typography variant="subtitle2" color="white">
                {" "}
                Add Task
              </Typography>{" "}
            </Link>
            {/* {token ? (
             ""
            ) : (
              <Link to={"/login"} color="white">
                <Typography variant="subtitle2" color={"white"}>
                  Login{" "}
                </Typography>
              </Link>
            )} */}
            <Link to={"/login"} color="white">
                <Typography variant="subtitle2" color={"white"}>
                  Login{" "}
                </Typography>
              </Link>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
