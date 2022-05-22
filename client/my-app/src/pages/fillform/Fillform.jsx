import React from 'react'
import TopBar from "../../Components/topBar/TopBar";
import Result from "../../Components/result/Result";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from "axios";
import "./fillform.css";




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
        console.log(data);
        try {
            const res = await axios.post(`${apiLink}`, data);
            setPredictResult(res.data.prediction);
            //console.log(predictResult);
      
            
          } catch (err) {console.log(err)}
        
        
      };

    return (
        <div>
            <TopBar/>
            <div>
                <h1>Crop recommandation</h1>
                <h2>We help you find the best crop you can grow</h2>
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
      
      <TextField id="standard-basic" label="Nitrogen" variant="standard" onChange={e => setNitrogen(e.target.value) } />
      <TextField id="standard-basic" label="Potassium" variant="standard" onChange={e => setPotassium(e.target.value) } />
      <TextField id="standard-basic" label="Phosphorius" variant="standard" onChange={e => setPhosphorius(e.target.value) } />

          </Box>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2.5, width: '26ch' },
      }}
      noValidate
      autoComplete="off"
      
    >
      
      <TextField id="standard-basic" label="Temperature" variant="standard" onChange={e => setTemperature(e.target.value) } />
      <TextField id="standard-basic" label="Humidity" variant="standard" onChange={e => setHumidity(e.target.value) } />
      <TextField id="standard-basic" label="PH" variant="standard" onChange={e => setPh(e.target.value) } />
      <TextField id="standard-basic" label="Rainfall" variant="standard" onChange={e => setRainfall(e.target.value) } />


          </Box>
      <Button variant="contained" size="large" onClick={handleClick} classname="predictButton">Predict</Button>
          </center>
          
          {
              predictResult? 
              <Result result={predictResult}/>
                
              
              :null}
      </div>
            
            
            



        
      )}