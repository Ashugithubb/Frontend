'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 1,
  whiteSpace: 'nowrap',
  width: 1,
});
const handleFileUpload = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    
    e.preventDefault();
    if(!e.target.files || e.target.files.length === 0 ) return;
    const formDate = new FormData();
    formDate.append('file',e.target.files?.[0]);
    try{
    const msg = await axios.post("http://localhost:3000/upload",formDate);
    console.log(msg);
    }
    catch(err){
        console.log(err);
    }
    
}
export default function InputFileUpload() {
  return (
    <Button
    sx={{display:"flex",justifyContent:"center",marginLeft:"45%",marginRight:"45%",marginTop:"20%"}}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={handleFileUpload}
        multiple
      />
    </Button>
  );
}