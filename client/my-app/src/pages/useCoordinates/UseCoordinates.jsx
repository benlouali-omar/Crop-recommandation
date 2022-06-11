import React from 'react'
import TopBar from "../../Components/topBar/TopBar";
import axios from "axios";
import TextField from '@mui/material/TextField';
import { useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import "./useCoordinates.css";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Result from "../../Components/result/Result";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { predictCall } from '../../predict';

// import { Map, GoogleApiWrapper } from 'google-maps-react';

export default function UseCoordinates() {
    
    const apiLink = "http://127.0.0.1:8000/predict";
    
    
    const [location, setLocation] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [showlocation, setShowlocation] = useState(false);
    const [showcoordinates, setShowcoordinates] = useState(true);
    const [nitrogen, setNitrogen] = useState('');
    const [loading, setLoading] = useState(false);


    // const [temperaturee, setTemperature] = useState('');
    // const [humidityy, setHumidity] = useState('');
    // const [rainfalll, setRainfall] = useState('');

    const [potassium, setPotassium] = useState('');
    const [phosphorius, setPhosphorius] = useState('');
    const [ph, setPh] = useState('');
    const [prediction, setPrediction] = useState('');
    const [locationByCoords, setLocationByCoords] = useState('');
    const [dataInvalid, setDataInvalid] = useState(false);



    const [locationInvalid, setLocationInvalid] = useState(false);
    



    const showLocation = () =>{
        setShowlocation(true);
        setShowcoordinates(false);
        setLongitude('');
        setLatitude('');
        setLocationInvalid(false);
        setLocationByCoords(null);
        setPrediction(null);
        setDataInvalid(false);

        




    };

    const showCoordinates = () =>{
        setShowcoordinates(true);
        setShowlocation(false);
        setLocation('');
        setLocationInvalid(false);
        setPrediction(null);
        setDataInvalid(false);
        
    };

    
    
    useEffect(() => {
      const getName = async () => {
        axios.get('http://api.openweathermap.org/geo/1.0/reverse?lat='+latitude+'&lon='+longitude+'&limit=5&appid=1d881679d39500011fae255732d17344')
       .then(response => {
             const apiResponse = response.data;
             const city = apiResponse[0].name;
             const region = apiResponse[0].state;
             const country = apiResponse[0].country;
            //  if (!country && !city && !region) {
            //      //setCoordinatesInvalid(true);
            //      //setLocationByCoords('');
            //      //setPrediction('');
            //      setDataInvalid(true);

            //  };
             setLocationByCoords(`${city},${region? `${region},` : ''} ${country}`);
             console.log('location :'+city,country);
        }).catch(error => {
           console.log(error);
           //setLocationInvalid(true);
           
          });
        

      };
      getName();
    }, [latitude,longitude]);

    const handlePredict = async (e) => {
      e.preventDefault();
      setLoading(true);
      setPrediction(null);
      setLocationInvalid(false);
      setDataInvalid(false);
      


      

    if (latitude && longitude){ 
      try{
      const response = await axios.get('http://history.openweathermap.org/data/2.5/aggregated/year?lat='+latitude+'&lon='+longitude+'&units=metric&appid=1d881679d39500011fae255732d17344')
      const apiResponsee = response.data.result;
                  var temperature = 0;
                  var humidity = 0;
                  var precipitation = 0;
                  for (let i = 0; i < apiResponsee.length; i++) {
                    temperature = temperature + (apiResponsee[i].temp.mean);
                    humidity = (humidity + (apiResponsee[i].humidity.mean));
                    precipitation = precipitation + (apiResponsee[i].precipitation.max);
                  };
                  

                  const data = {
                    nitrogen: nitrogen,
                    potassium: potassium ,
                    phosphorius: phosphorius,
                    temperature: (temperature/366)-(273.15),
                    humidity: humidity/366,
                    ph: ph,
                    rainfall: precipitation,
                  };

                  const res =  await axios.post(`${apiLink}`, data );
                  console.log(data);
                  console.log(res.data.prediction);
                  setPrediction(res.data.prediction);
                  console.log(prediction);
                  res.data.prediction ? setLoading(false) : setLoading(true);



                  
             }
             catch(error) {
                console.log(error);
                setDataInvalid(true);
                setLoading(false);

               };

           
        
            
    };

    if (location){
      try {
      const res = await axios.get('http://api.openweathermap.org/geo/1.0/direct?q='+location+'&limit=5&appid=1d881679d39500011fae255732d17344')
      const apiResponse = res.data;
      setLocationByCoords(location);
      console.log(apiResponse[0].lat,apiResponse[0].lon);

      const response = await axios.get('http://history.openweathermap.org/data/2.5/aggregated/year?lat='+apiResponse[0].lat+'&lon='+apiResponse[0].lon+'&units=metric&appid=1d881679d39500011fae255732d17344')
      const apiResponsee = response.data.result;
                  var temperature = 0;
                  var humidity = 0;
                  var precipitation = 0;
                  for (let i = 0; i < apiResponsee.length; i++) {
                    temperature = temperature + (apiResponsee[i].temp.mean);
                    humidity = (humidity + (apiResponsee[i].humidity.mean));
                    precipitation = precipitation + (apiResponsee[i].precipitation.max);
                  };
                  

                  const data = {
                    nitrogen: nitrogen,
                    potassium: potassium ,
                    phosphorius: phosphorius,
                    temperature: (temperature/366)-(273.15),
                    humidity: humidity/366,
                    ph: ph,
                    rainfall: precipitation,
                  };

                  const ress =  await axios.post(`${apiLink}`, data );
                  console.log(data);
                  console.log(ress.data.prediction);
                  setPrediction(ress.data.prediction);
                  
                  ress.data.prediction ? setLoading(false) : setLoading(true);


       }  
       catch(error) {
             console.log(error);
             setDataInvalid(true);
             setLoading(false);

            };               
    }
  
  
  };
    


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
                
      
      <PlacesAutocomplete
        value={location}
        onChange={setLocation}
        
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2.5, width: '26ch' },
      }}
      noValidate
      autoComplete="off"
      
    >
            <TextField required id="standard-required" variant="outlined" label="Location" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }}   {...getInputProps()} />
    </Box>
           
            <div>
              {loading ? <div>...Loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      
      
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

    


    <Button variant="contained" size="large" style={{marginTop:"10.5px"}} onClick={handlePredict}  classname="predictButton">{loading ?  <CircularProgress color="inherit" /> : 'Predict'}</Button>
    {
              prediction?
              <> 
              <center>
               <br />
               <div style={{padding:"6px",textAlign:"center"}}>
              <h6><span style={{backgroundColor:"white",padding:"8px",borderRadius:"9px",color:"#666a6d"}}> You are predicting for the location of : {locationByCoords}</span></h6>
              </div>
              <Result result={prediction}/>
             </center>
             </>
                
              
              :null 
              
              }
    
    {
              
              locationInvalid ?
              <Alert severity="warning" style={{marginTop:"40px"}}>Please enter a valid Location!</Alert>
              
              
              :null}
    {
              
              dataInvalid ?
              <Alert severity="warning" style={{marginTop:"40px"}}>Something went wrong, Please enter valid data!</Alert>
              
              
              :null}
    
            </center>
            
        </div>
        )
        }
        
        





