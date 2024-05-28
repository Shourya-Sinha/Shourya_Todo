import React, { useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import ViewedTaskComp from "../Components/ViewedTaskComp";
import axios from 'axios';

const Home = () => {

  return (
    <>
      <Box sx={{ minHeight: "500px"}}>
      <Container>
      <Stack
          spacing={1}
          sx={{ marginBottom: 5 }}
          direction={"row"}
          alignItems={"center"}
        >
          <Typography variant="h5" sx={{paddingLeft:4}}> Running Task </Typography>
          <Typography variant="caption">
            (If task Complete then Click Check Button)
          </Typography>
        </Stack>
        <ViewedTaskComp />
      </Container>
       
      </Box>
    </>
  );
};

export default Home;
