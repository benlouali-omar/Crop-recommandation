import React from 'react'
import TopBar from "../../Components/topBar/TopBar";
import axios from "axios";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Box from '@mui/material/Box';
import "./useCoordinates.css";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

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
    const [locationInvalid, setLocationInvalid] = useState(false);
    const [coordinatesInvalid, setCoordinatesInvalid] = useState(false);



    const showLocation = () =>{
        setShowlocation(true);
        setShowcoordinates(false);
        setLongitude('');
        setLatitude('');
        setLocationInvalid(false);
        setCoordinatesInvalid(false);
    };

    const showCoordinates = () =>{
        setShowcoordinates(true);
        setShowlocation(false);
        setLocation('');
        setLocationInvalid(false);
        setCoordinatesInvalid(false);
    };
    console.log(location);

    const handlePredict = async (e) => {
      e.preventDefault();
      setLocationInvalid(false);
      setCoordinatesInvalid(false);


      //console.log(location,longitude,latitude);

    if (latitude && longitude){
      axios.get('https://api.opencagedat.com/geocode/v1/json?key=&q='+latitude+'%2C'+longitude+'&pretty=1&no_annotations=1')
         .then(response => {
               const apiResponse = response.data;
               const city = apiResponse.results[0].components.city;
               const region = apiResponse.results[0].components.region;
               const country = apiResponse.results[0].components.country;
               if (!region || !city) {
                   setCoordinatesInvalid(true);

               };
               console.log(city + ", " + region + ", " + country );
          }).catch(error => {
             console.log(error);
             setCoordinatesInvalid(true);
            });
    };

    if (location){
      axios.get('https://api.opencagedat.com/geocode/v1/json?key=&q='+location+'&pretty=1&no_annotations=1')
         .then(response => {
               const apiResponse = response.data;
               console.log(apiResponse.results[0].components.city + ", " + apiResponse.results[0].components.region + ", " + apiResponse.results[0].components.country );
          }).catch(error => {
             console.log(error);
             setLocationInvalid(true);

            });
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

    


    <Button variant="contained" size="large" style={{marginTop:"10.5px"}} onClick={handlePredict}  classname="predictButton">Predict</Button>
    {
              
              locationInvalid ?
              <Alert severity="warning" style={{marginTop:"40px"}}>Please enter a valid Location!</Alert>
              
              
              :null}
    {
              
              coordinatesInvalid ?
              <Alert severity="warning" style={{marginTop:"40px"}}>Please enter valid coordinates!</Alert>
              
              
              :null}
            </center>
            
        </div>
        )
        }
        
        





