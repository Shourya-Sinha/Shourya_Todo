import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
   <>
     <Box>
        <Container sx={{ my: 4 }}>
          <Typography variant="h5" sx={{ my: 2 ,textAlign:'center'}}>
            Todo's
          </Typography>
          <Stack spacing={2} sx={{ mb: 2 }}>
            <TextField placeholder="Enter New Password" name='newPassword' />
           
          </Stack>
          <Stack spacing={2} sx={{ mb: 2 }}>
          <TextField placeholder="Enter Confirm Password" name='confirmPassword' />
          </Stack>
          <Stack sx={{ textAlign: "end" }}>
            <Typography variant="caption">
              You want to Login:
              <Link to={"/login"}> Login </Link>
            </Typography>{" "}
          </Stack>

          <Button variant="contained" fullWidth>
            {" "}
            Reset Password
          </Button>
        </Container>
      </Box>
   </>
  )
}

export default ForgotPassword;