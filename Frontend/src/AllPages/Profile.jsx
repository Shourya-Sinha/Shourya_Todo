import { Toys } from "@mui/icons-material";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
    const [userData, setUserData] = useState('');
    const token = useSelector((state) => state.auth.token);
    const [images, setImage] = useState(null);

    const fetchUserData= async()=>{
        try {
            const response = await axios.get('http://localhost:3000/api/v1/getuser-data',{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
            });
            setUserData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        fetchUserData();
    },[]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
       // console.log('image',e.target.files[0]);
      };
    
      const handleImageUpload = async () => {
        //console.log("Starting image upload...");
        const formData = new FormData();
        formData.append('images', images);
        //console.log('file', formData);
        try {
          await axios.post('http://localhost:3000/api/v1/update-me', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });
          //console.log("Image upload successful!");
          fetchUserData();
        } catch (error) {
          console.log("Error uploading image:", error);
        }
      };
      

    if (!userData) {
        return <Typography>Loading...</Typography>;
    }
  return (
    <>
      <Box sx={{ height: "100vh", width: "100vw" }}>
        <Stack sx={{ my: 3, paddingLeft: 3 }}>
          <Typography variant="h5">Profile</Typography>
        </Stack>
        <Container>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <img
                  src={userData.user.images && userData.user.images.length > 0 ? userData.user.images[0].url : "https://ik.imagekit.io/p66ljstle/men.jpg?updatedAt=1714383014367"}
                  alt="User Image"
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
                <Typography>Update Pic</Typography>
                <form encType="multipart/form-data" >
                  <input type="file" onChange={handleImageChange} />
                  <Button type="button" onClick={handleImageUpload}>Upload</Button>
                </form>
                <Stack sx={{paddingLeft:2}}>
                <Typography variant="subtitle2" sx={{textTransform:'uppercase'}}>Name:  {userData.user.userName}</Typography>
                <Typography variant="subtitle2">Gender: {userData.user.gender}</Typography>
                <Typography variant="subtitle2">+91 {userData.user.phoneNo} </Typography>
                <Typography variant="subtitle2">
                  {userData.user.email}
                </Typography>
                </Stack>
               <Typography variant="caption" sx={{paddingLeft:2}}>  <Link to={'/reset-pass'}> Reset Your Password</Link></Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop:5}}>
              <Grid container>
                <Grid item xs={12} md={6} sm={6} sx={{mb:1}}>
                  <Stack sx={{ width: 270, height: 100, border: 1,textAlign:'center', justifyContent:'center', borderRadius:2 }}>
                    <Typography variant="body2">
                      Current Running Task
                    </Typography>
                    <Typography variant="caption">{userData.tasksCount.currentTask}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6} sm={6}>
                  <Stack sx={{ width: 270, height: 100, border: 1 ,textAlign:'center', justifyContent:'center', borderRadius:2}}>
                    <Typography variant="body2">Comleted Task</Typography>
                    <Typography variant="caption">{userData.tasksCount.completedTask}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6} sm={6} >
                  <Stack sx={{ width: 270, height: 100, border: 1 ,textAlign:'center', justifyContent:'center', borderRadius:2}}>
                    <Typography variant="body2">Updated Task</Typography>
                    <Typography variant="caption">{userData.tasksCount.updatedTask}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6} sm={6} >
                  <Stack sx={{ width: 270, height: 100, border: 1 ,textAlign:'center', justifyContent:'center', borderRadius:2}}>
                    <Typography variant="body2">Deleted Task</Typography>
                    <Typography variant="caption">{userData.tasksCount.deletedTask}</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
