import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { AddCircleOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const TaskComp = () => {
  const [task, setTasks] = useState('');
  //const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleChange =(e) =>{
    setTasks(e.target.value);
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/createTask',{task},{
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        },
      });
      console.log(response.data);
      setTasks('');
    } catch (error) {
      console.log('error creating', error)
    }
  }

  return (
    <>
     <Container sx={{flexGrow:1,minWidth:700}}>
      <form method="method" onSubmit={handleSubmit} >
        <Stack spacing={2} sx={{flexGrow:1}}>
          <FormControl variant="outlined" fullWidth sx={{flexGrow:1}} >
            <OutlinedInput
              name="task"
              value={task}
              onChange={handleChange}
              placeholder="Enter Task"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <AddCircleOutline color="primary" fontSize="large" />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack>
      </form>
    </Container>
    </>
  );
};

export default TaskComp;
