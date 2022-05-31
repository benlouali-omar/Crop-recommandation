import React from 'react'
import TopBar from "../../Components/topBar/TopBar";
import axios from "axios";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Box from '@mui/material/Box';
import "./useCoordinates.css";
import Button from '@mui/material/Button';
// import { Map, GoogleApiWrapper } from 'google-maps-react';

export default function UseCoordinates() {
    
    const [location, setLocation] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [showlocation, setShowlocation] = useState(false);
    const [showcoordinates, setShowcoordinates] = useState(true);
    const [nitrogen, setNitrogen] = useState('');
    const [potassium, setPotassium] = useState('');
    const [phosphorius, setPhosphorius] = useState('');
    const [ph, setPh] = useState('');

    const showLocation = () =>{
        setShowlocation(true);
        setShowcoordinates(false);
    };

    const showCoordinates = () =>{
        setShowcoordinates(true);
        setShowlocation(false);
    };

    const handlePredict = () => {
    console.log(location,longitude,latitude);
      

    };
    // const params = {
    //       access_key: '532cb6020f5b4321f45a1fab81827ad9',
    //       lat: ,
    //       lng: 
    // };
    
  
    

    // axios.get('http://api.weatherstac.com/current', {params})
    //      .then(response => {
    //            const apiResponse = response.data;
    //            console.log(`location: ${apiResponse.location.name},`,
    //                        `humidity: ${apiResponse.current.humidity},`,
    //                        `temperature: ${apiResponse.current.temperature},`,
    //                        `rainfall: ${apiResponse.current.precip}`);
    //       }).catch(error => {
    //          console.log(error);
    //         });


    return (
        <div>
            <TopBar/>
            <center>
            {
            showcoordinates? 
            <>
            <div>
            <h4 className="enterCoords">Enter coordinates or </h4>
    
    <Button variant="contained" size="small" style={{marginTop:"2px",backgroundColor:"#4cbb17",display:"inline-block",marginLeft:"12px"}} onClick={showLocation} classname="predictButton">Enter Location</Button>
    </div>
                <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2.5, width: '26ch' },
      }}
      noValidate
      autoComplete="off"
      
    >
      
      <TextField required id="standard-required"  label="Longitude" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }}  onChange={(e) => setLongitude(e.target.value)} />
      <TextField required id="standard-required" label="Latitude" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }} onChange={(e) => setLatitude(e.target.value) } />
      
    </Box>
    </>
    :null
    }

{
            showlocation? 
            <>
            <div>
            <h4 className="enterCoords">Enter location or </h4>
    
    <Button variant="contained" size="small" style={{marginTop:"2.5px",backgroundColor:"#4cbb17",display:"inline-block",marginLeft:"12px"}} onClick={showCoordinates} classname="predictButton">Enter Coordinates</Button>
    </div>
                <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2.5, width: '26ch' },
      }}
      noValidate
      autoComplete="off"
      
    >
      
      <TextField required id="standard-required"  label="Location" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }}  onChange={(e) => setLocation(e.target.value)} />
      
    </Box>
    </>
    :null
    }

<Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2.5, width: '26ch' },
      }}
      noValidate
      autoComplete="off"
      
    >
      
      <TextField required id="standard-required"  label="Phosphorius" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }}  onChange={(e) => setPhosphorius(e.target.value)} />
      <TextField required id="standard-required" label="Nitrogen" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }} onChange={(e) => setNitrogen(e.target.value) } />
    <TextField required id="standard-required" label="Potassium" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }} onChange={(e) => setPotassium(e.target.value) } />
    <TextField required id="standard-required" label="Ph" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }} onChange={(e) => setPh(e.target.value) } />
    </Box>

    


    <Button variant="contained" size="large" style={{marginTop:"10.5px"}} onClick={handlePredict}  classname="predictButton">Predict</Button>
 
            </center>
            
        </div>
        )
        }
        
        





