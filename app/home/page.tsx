'use client'
import {
  Avatar,
  Box,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import axios from "axios";
import Verifyotp from "../otp/page";
import { useAppSelector } from "../redux/hook/hook";
export default function Profile() {
const email = useAppSelector((state)=>state.user.email);
const selectVarified = useAppSelector((state)=>state.user.isVerified);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [cloudUrl,setCloudUrl] = useState<string>("");
 
  const [open,setOpen] = useState<boolean>(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));

    try {
      const formData = new FormData();
      formData.append('file', file); 

      const res = await axios.post("http://localhost:3333/user/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setCloudUrl(res.data); 
    } catch (err) {
      console.error(err);
    }
  }
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  const payload = {
    name: formData.get('name'),
    age: formData.get('age'),
    gender: formData.get('gender'),
    email: formData.get('email'),
    avatar: cloudUrl
  };
console.log(payload);
  try {
    const res = await axios.post('http://localhost:3333/user/profile', payload, {
      withCredentials: true, 
    });

    console.log('Response:', res.data);
    alert('Profile submitted successfully!');
  } catch (err) {
    console.error('Error submitting form:', err);
    alert('Submission failed.');
  }
}
async function handelVerify(){
    setOpen(true)
    try{
    await axios.post("http://localhost:3333/user/send",{email});
    }
    catch(err){
      console.log(err);
    }
   
}


  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h5" gutterBottom>Submit Your Profile</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginRight: "50px" }}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              sx={{ width: 80, height: 80 }}
              src={avatarPreview || ''}
            />
            <Button
              variant="outlined"
              component="label"
              size="small"
              sx={{
                minWidth: 0,
                position: "absolute",

                bottom: 0,
                right: 0,
                marginTop: "200%",

                padding: "4px",
                borderRadius: "50%",
                backgroundColor: "white",
              }}
            >
              <EditIcon fontSize="small" />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </Button>
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" margin="normal" required />
          <TextField fullWidth label="Age" name="age" type="number" margin="normal" required />

          <FormLabel sx={{ mt: 2 }}>Gender</FormLabel>
          <RadioGroup row name="gender">
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>

          <TextField fullWidth label="Email" name="email" type="email" margin="normal" defaultValue={email}required />

             {open && !selectVarified && <Verifyotp />}
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button   disabled={selectVarified} onClick={handelVerify} color="success" variant="outlined" type="button">Verify</Button>
            <Button variant="contained" type="submit">Submit</Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
