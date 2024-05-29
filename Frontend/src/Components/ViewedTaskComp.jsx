import { DeleteForever, DoneAll, Edit } from "@mui/icons-material";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

const REACT_APP_API_URL='https://shourya-todo.onrender.com/api/v1';
const ViewedTaskComp = () => {
  const [getTask, setGetTask] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const getallTask = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/getallTask`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const uncompletedTasks = response.data.tasks.filter(task => !task.completed);
      setGetTask(uncompletedTasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallTask();
  }, []);

  const handleEditClick = (taskId, taskText) => {
    setEditTaskId(taskId);
    setEditTaskText(taskText);
    setOpen(true);
  };

  const handleEditTask = async () => {
    try {
      await axios.put(
        `${REACT_APP_API_URL}/updateTask`,
        { taskId: editTaskId, task: editTaskText },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getallTask(); // Refresh the task list
      setOpen(false); // Close the dialog
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteClick = async (taskId) => {
    try {
      //console.log('id',taskId);
      await axios.post(
        `${REACT_APP_API_URL}/completed`",
        { taskId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log('id',taskId);
      getallTask(); // Refresh the task list
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = async (taskId) => {
    try {
      await axios.delete(`${REACT_APP_API_URL}/deleteTask`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { taskId },
      });
      getallTask(); // Refresh the task list
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
     <Container sx={{ minWidth: 500 }}>
        {getTask.map((task) => (
          <Stack key={task._id} spacing={2} sx={{ marginBottom: 2 }}>
            <Typography variant="caption" sx={{ textAlign: "end", paddingRight: 7 }}>
            Created At: {new Date(task.createdAt).toLocaleString()}
            </Typography>
            <Stack spacing={2} direction={"row"}>
              <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                  name="task"
                  value={task.task}
                  readOnly
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleEditClick(task._id, task.task)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(task._id)}>
                        <DeleteForever color="primary" />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <IconButton onClick={() => handleCompleteClick(task._id)}>
                <DoneAll color="primary" />
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Container>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit this task, please modify the task description and click save.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Task"
            type="text"
            fullWidth
            value={editTaskText}
            onChange={(e) => setEditTaskText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewedTaskComp;
