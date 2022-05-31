import React from 'react'
import TopBar from "../../Components/topBar/TopBar";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./home.css";
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';


//////////////
export default function Home() {
    return (
        <div>
            <TopBar/>
            <div>
                <h1>Crop recommandation</h1>
                <h2>We help you find the best crop you can grow</h2>
            </div>
            
            <Stack spacing={2} direction="row" style={{justifyContent: 'center' }}>
            <Link to="/fillform" style={{textDecoration:"none",color:"white"}}>
            <Button variant="outlined" style={{backgroundColor:"white",borderWidth:"2px"}} size="large" classname="buttonsDiv">Fill features form</Button>
            </Link>
            <Link to="/usecoordinates" style={{textDecoration:"none",color:"white"}}>
            <Button variant="outlined" style={{backgroundColor:"white",borderWidth:"2px"}} size="large" classname="buttonsDiv">Use coordinates</Button>
            </Link>
            <Link to="/usemap" style={{textDecoration:"none",color:"white"}}>
            <Button variant="outlined" style={{backgroundColor:"white",borderWidth:"2px"}} size="large" classname="buttonsDiv">Use Map</Button>
            </Link>
            </Stack>
            </div>



        
      )}
    
  
