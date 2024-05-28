import React from 'react'
import TaskComp from '../Components/TaskComp';
import { Box } from '@mui/material';

const AddTask = () => {

  
  return (
    <>
    <Box sx={{minHeight:300, marginTop:5}}>
    <TaskComp />
    </Box>
        
    </>
  )
}

export default AddTask;