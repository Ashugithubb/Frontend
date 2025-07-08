'use client'
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useAppSelector } from "../redux/hook/hook";
import { useAppDispatch } from "../redux/store/store";
import { setUser } from "../redux/slice/user";


export default function Verifyotp() {
    const [otp,setOtp] = useState("")
    const email = useAppSelector((state)=>state.user.email);
    const dispatch = useAppDispatch();
    async function handelClick(){
      try{
       const res  =  await axios.post("http://localhost:3333/user/verify",{email,otp});
       console.log(res.data);
       if(res.data===true){
           dispatch(setUser({ email: email, isVerified: true }));
       }}
       catch(err){
        console.log(err);
       }
    }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
      <Paper elevation={16} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          Verify OTP
        </Typography>
        <TextField
          fullWidth
          label="Enter OTP"
          name="otp"
          type="text"
          margin="normal"
          required
          onChange={(e)=>setOtp(e.target.value)}
        />
        <Button onClick={handelClick} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Verify
        </Button>
      </Paper>
    </Box>
  );
}
