import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper, LoadingContainer } from "google-maps-react";
import { width } from "@mui/system";
import TopBar from "../../Components/topBar/TopBar";
import "./usemapp.css";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Result from "../../Components/result/Result";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';






export class UseMapp extends Component {
  
    
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      longitude: -6.8498129, //Rabat
      latitude:33.9715904,
      nitrogen : null,
      potassium:null,
      phosphorius:null,
      ph:null,
      prediction:null,
      loading:false,
      invalidData:false,
      locationName:null,

    };
    console.log(this.state.prediction);

  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.latitude !== this.state.latitude || prevState.longitude !== this.state.longitude ) {
      const getName = async () => {
        axios.get('http://api.openweathermap.org/geo/1.0/reverse?lat='+this.state.latitude+'&lon='+this.state.longitude+'&limit=5&appid=1d881679d39500011fae255732d17344')
       .then(response => {
             const apiResponse = response.data;
             const city = apiResponse[0].name;
             const region = apiResponse[0].state;
             const country = apiResponse[0].country;
            
             this.setState({
              locationName:`${city},${region? `${region},` : ''} ${country}`,
          });
          //console.log(this.state.locationName);
             
        }).catch(error => {
           console.log(error);
           
          });
        
  
      };
      getName();
    }
  }
  
     



    


  async onMarkerClick(props, marker, e) {
    

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      longitude: marker.getPosition().lng().toFixed(5),
      latitude: marker.getPosition().lat().toFixed(5)
    });
    


  }
async handleClick()  {
  this.setState({
      loading:true,
      prediction:false,
      invalidData:false,
  });
    try {
    const apiLink = "http://127.0.0.1:8000/predict";
    
    
    const response = await axios.get('http://history.openweathermap.org/data/2.5/aggregated/year?lat='+this.state.latitude+'&lon='+this.state.longitude+'&units=metric&appid=1d881679d39500011fae255732d17344')
    const apiResponsee = response.data.result;
                  var temperature = 0;
                  var humidity = 0;
                  var precipitation = 0;
                  for (let i = 0; i < apiResponsee.length; i++) {
                    temperature = temperature + (apiResponsee[i].temp.mean);
                    humidity = (humidity + (apiResponsee[i].humidity.mean));
                    precipitation = precipitation + (apiResponsee[i].precipitation.max);
                  };
                  
                  console.log(response.data.result);
                  const data = {
                    nitrogen: this.state.nitrogen,
                    potassium: this.state.potassium ,
                    phosphorius: this.state.phosphorius,
                    temperature: (temperature/366)-(273.15),
                    humidity: humidity/366,
                    ph: this.state.ph,
                    rainfall: precipitation,
                  };

                  const res =  await axios.post(`${apiLink}`, data );
                  console.log(data);
                  console.log(res.data.prediction);
                  this.setState({
                    prediction:res.data.prediction,
                    loading:false,
      
                  });




                }   
             catch(error) {
                console.log(error);
                this.setState({
                  invalidData:true,
                  loading:false,
    
                });
                

               };
    
  }

  moveMarker(props, marker, e)  {
    this.setState({
      
      
    });
    //console.log("dragged");



  }
  
  
  render() {
    

    
    console.log(this.state.latitude,this.state.longitude);
    const LoadingContainer = (props) => (
        <div>Fancy loading container!</div>
      )

    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
        <>
        <TopBar/>

    
      <h2 className="title">Drag the marker to the desired location and fill in the required data</h2><br />
      
      <div
        style={{
          position: "relative",
          height: "calc(80vh - 10px)",
          width:"53%",
          
          float:"right"
        }}
      >
        
        
        <Map style={{marginTop:"-6px",marginRight:"20px"}} initialCenter={{
            lat: 33.9715904,
            lng: -6.8498129
          }} google={this.props.google} zoom={11}>
              
          <Marker
            onClick={this.onMarkerClick}
            draggable={true}
            onDragend={this.moveMarker}
            name={this.state.locationName}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
      <div className='formDiv'>
      <center>
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
    }}  onChange={(e) => this.setState({
      phosphorius:e.target.value,
      
    })} />
      <TextField required id="standard-required" label="Nitrogen" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }} onChange={(e) => {this.setState({
      nitrogen:e.target.value,
      
    })} } />
    <TextField required id="standard-required" label="Potassium" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }} onChange={(e) => {this.setState({
      potassium:e.target.value,
      
    })} } />
    <TextField required id="standard-required" label="Ph" variant="outlined" InputProps={{
        style: {
            color: "black",
            backgroundColor:"snow"
        }
    }} onChange={(e) => {this.setState({
      ph:e.target.value,
      
    })} } />
    </Box>
    <Button variant="contained" size="large" style={{marginTop:"10.5px",backgroundColor:"#4cbb17"}} onClick={this.handleClick} >{this.state.loading ?  <CircularProgress color="inherit" /> : 'Predict'} </Button>
    </center>
    {
              this.state.prediction?
              <> 
              <center>
               <br />
               <br />
               <div style={{padding:"6px",textAlign:"center"}}>
              <h6><span style={{backgroundColor:"white",padding:"8px",borderRadius:"9px",color:"#666a6d"}}> You are predicting for the location of : {this.state.locationName}</span></h6>
              </div>
              
              
              <Result result={this.state.prediction}/>
             </center>
             </>
                
              
              :null 
              
              }
      {
              
              this.state.invalidData ?
              <Alert severity="warning" style={{marginTop:"40px"}}>Something went wrong, Please enter valid data!</Alert>
              
              
              :null}
    </div>

    </>

    );
  }
}
export default GoogleApiWrapper({
  apiKey: "",
  LoadingContainer: LoadingContainer,
  v: "3.30"
})(UseMapp);