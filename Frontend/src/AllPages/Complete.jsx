import { DoneAll } from "@mui/icons-material";
import { Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Complete = () => {
  const [getTask, setGetTask] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const fetchComletedTask = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/getallTask",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const completedTask = response.data.tasks.filter(
        (task) => task.completed
      );
      setGetTask(completedTask);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComletedTask();
  }, []);
  return (
    <>
      <Container sx={{ minWidth: 700, minHeight: 300, marginTop: 5 }}>
        {getTask.map((task) => (
          <Stack key={task._id}>
            <Typography
              variant="caption"
              sx={{ textAlign: "end", paddingRight: 5 }}
            >
              CompletedAt : {new Date(task.completedAt).toLocaleString()}{" "}
            </Typography>
            <Stack
              spacing={2}
              sx={{ alignItems: "center", marginBottom: 2 }}
              direction={"row"}
            >
              <TextField sx={{ flexGrow: 1 }} value={task.task} />
              <DoneAll />
            </Stack>
          </Stack>
        ))}
      </Container>
    </>
  );
};

export default Complete;
