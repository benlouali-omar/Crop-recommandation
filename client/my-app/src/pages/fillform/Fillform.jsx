import React from 'react'
import TopBar from "../../Components/topBar/TopBar";
import Result from "../../Components/result/Result";
import DataInfo from "../../Components/dataInfo/DataInfo";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/styles';
import axios from "axios";
import "./fillform.css";
import Alert from '@mui/material/Alert';
import {toast} from 'react-toastify';
import Popup from 'reactjs-popup';





//////////////
export default function Fillform() {

    const [nitrogen, setNitrogen] = useState('');
    const [potassium, setPotassium] = useState('');
    const [phosphorius, setPhosphorius] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [ph, setPh] = useState('');
    const [rainfall, setRainfall] = useState('');
    const [predictResult,setPredictResult] = useState('');
    const [notallFilled,setnotallFilled] = useState(false);
    const [notallNumeric,setnotallNumeric] = useState(false);
    


    const apiLink = "http://127.0.0.1:8000/predict";



    const handleClick = async (e) => {
        e.preventDefault();
        const data = {
            nitrogen: nitrogen,
            potassium: potassium ,
            phosphorius: phosphorius,
            temperature: temperature,
            humidity: humidity,
            ph: ph,
            rainfall: rainfall,
          };
        //console.log(data);
        if (nitrogen === "" || potassium === "" || phosphorius=== ""|| temperature=== ""|| humidity=== "" || ph=== "" ||rainfall=== ""){
        
          setnotallFilled(true);
          setnotallNumeric(false);
          console.log("not all filled");
        
          }
         
        else {
          try {
            const res = await axios.post(`${apiLink}`, data);
            setPredictResult(res.data.prediction);
            setnotallFilled(false);
            setnotallNumeric(false);
            console.log(predictResult);
           
          } catch (err) {
            console.log(err);
            setnotallNumeric(true);
            setnotallFilled(false);

          }
        }
            }

    const newPredictionClick = () => {
      window.location.reload(false);
    }
        
    return (
        <div>
            <TopBar/>
            <div>
                <h1>Crop recommandation</h1>
                <h2>We help you find the best crop you can grow in your farm</h2>
                <DataInfo/>
                
                
            </div>
            <center>
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2.5, width: '26ch' },
      }}
      noValidate
      autoComplete="off"
      
    >
      
      <TextField required id="standard-required"  label="Nitrogen" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }}  onChange={e => setNitrogen(e.target.value) } />
      <TextField required id="standard-required" label="Potassium" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }} onChange={e => setPotassium(e.target.value) } />
      <TextField required id="standard-required" label="Phosphorius" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }} onChange={e => setPhosphorius(e.target.value) } />

          </Box>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2.5, width: '26ch' },
      }}
      noValidate
      autoComplete="off"
      
    >
      
      <TextField required id="standard-required" label="Temperature" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }} onChange={e => setTemperature(e.target.value) } />
      <TextField required id="standard-required" label="Humidity" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }} onChange={e => setHumidity(e.target.value) } />
      <TextField required id="standard-required" label="PH" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }} onChange={e => setPh(e.target.value) } />
      <TextField required id="standard-required" label="Rainfall" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }} onChange={e => setRainfall(e.target.value) } />
      

          </Box>
      <Button variant="contained" size="large" style={{marginTop:"10.5px"}} onClick={handleClick} classname="predictButton">Predict</Button>
          </center>
          
          {
              predictResult?
              <> 
              <center>
              <Result result={predictResult}/>
              <Button variant="contained" size="medium"  onClick={newPredictionClick} style={{marginTop:"40px"}}>New prediction</Button>
             </center>
             </>
                
              
              :null 
              
              }
          {
              
              notallFilled ?
              <Alert severity="warning" style={{marginTop:"40px"}}>Please fill in all the fields!</Alert>
              
              
              :null}
          {
              
              notallNumeric ?  
              <Alert severity="warning" style={{marginTop:"40px"}}>Make sure all the fields are numerical!</Alert>
                
              
              :null}
      </div>
              
      )}