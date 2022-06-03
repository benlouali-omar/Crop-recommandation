import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper, LoadingContainer } from "google-maps-react";
import { width } from "@mui/system";
import TopBar from "../../Components/topBar/TopBar";
import "./usemapp.css";



export class UseMapp extends Component {
    
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  moveMarker(props, marker, e) {
    //console.log(e.latLng.lat().toFixed(5),e.latLng.lng().toFixed(5));
    console.log(marker.getPosition().lat().toFixed(5),marker.getPosition().lng().toFixed(5));

  }
  render() {
    const LoadingContainer = (props) => (
        <div>Fancy loading container!</div>
      )

    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
        <>
        <TopBar/>

    
      
      <div
        style={{
          position: "relative",
          height: "calc(80vh - 10px)",
          width:"53%",
          
          float:"right"
        }}
      >
      <h2 className="title">Drag the marker to the suitable location</h2><br />
        
        
        <Map style={{marginTop:"-6px",marginRight:"20px"}} initialCenter={{
            lat: 33.9715904,
            lng: -6.8498129
          }} google={this.props.google} zoom={11}>
              
          <Marker
            onClick={this.onMarkerClick}
            draggable={true}
            onDragend={this.moveMarker}
            name={"Rabat"}
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
      </>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "",
  LoadingContainer: LoadingContainer,
  v: "3.30"
})(UseMapp);