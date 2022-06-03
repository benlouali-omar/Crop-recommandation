import React from 'react'
import TopBar from "../../Components/topBar/TopBar";
import "./usemap.css";
import axios from "axios";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import MapSection from '../../Components/map/Map'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";



import { Map, GoogleApiWrapper } from 'google-maps-react';
//import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";


function UseMap() {
    // const apiKey = "";
    // const baseUrl = "http://api.weatherstack.com/current";
    const locationn = {
      address: '1600 Amphitheatre Parkway, Mountain View, california.',
      lat: 37.42216,
      lng: -122.08427,
    }
    const [location, setLocation] = useState('');
    const mapStyles = {
               width: '100%',
               height: '100%',
            };
    
    const params = {
          access_key: '532cb6020f5b4321f45a1fab81827ad9',
          query: 'New York'
    };
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({
      lat: null,
      lng: null
    });
  
    const handleSelect = async value => {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setAddress(value);
      setCoordinates(latLng);
    };

    axios.get('http://api.weatherstac.com/current', {params})
         .then(response => {
               const apiResponse = response.data;
               console.log(`location: ${apiResponse.location.name},`,
                           `humidity: ${apiResponse.current.humidity},`,
                           `temperature: ${apiResponse.current.temperature},`,
                           `rainfall: ${apiResponse.current.precip}`);
          }).catch(error => {
             console.log(error);
            });


    return (
        <div>
            <TopBar/>
            <center>
            </center>

            
        </div>
        )
        }
        
        





// export  function UseMap() {
//     const mapStyles = {
//         width: '100%',
//         height: '100%',
//       };
//     return (
//         <Map
//           google={this.props.google}
//           zoom={8}
//           style={mapStyles}
//           initialCenter={{ lat: 47.444, lng: -122.176}}
//         />
//     );
//     }
export default GoogleApiWrapper({
        apiKey: ''
      })(UseMap);