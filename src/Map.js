import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import React from 'react';
import ReactDOM from 'react-dom';
import MechanicDetails from './MechanicDetails';
import PaymentForm from './PaymentForm';

    class Map extends React.Component {

        constructor() {
          super()
            this.state = {
                mechanics: [],
                mapPosition:{
                    lat: 0,
                    lng: 0,
                },
                markerPosition:{
                    lat: 0,
                    lng: 0,
                },
                showPayment: false
            }
        }

        componentDidMount(){
            const request = "/mechanics";
            fetch(request)
            .then(response=>response.json())
            .then(json =>{
                this.setState({
                mechanics: json,
                })
            })

                if (navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(position =>{
                    this.setState({
                            mapPosition:{
                                lat: parseFloat(position.coords.latitude),
                                lng: parseFloat(position.coords.longitude),
                            },
                            markerPosition:{
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            }
                    })})
                }
        }

        showPayment() {
            this.setState({
                showPayment: true
            });
        }

        cancelPayment() {
            this.setState({
                showPayment: false
            });
        }

        showInfo(mechanic1){
            const mechanicDetails = <MechanicDetails
                                        mechanic={mechanic1}
                                        showPayment={this.showPayment.bind(this)}
                                    />;
            ReactDOM.render(mechanicDetails, document.getElementById('MechanicInf'));
        }

    render(){

        const {mechanics, showPayment} = this.state;
            const MapWithAMarker = withScriptjs(withGoogleMap(props =>
                <GoogleMap
                    defaultZoom={13}
                    defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng}}
                >
                    {mechanics.map(mechanic => (
                        <Marker
                            position={{
                                lat: mechanic.longitude,
                                lng: mechanic.latitude
                            }}
                            icon={{
                                url: "/Icon.jpg",
                                scaledSize: new window.google.maps.Size(20,20)
                            }}
                        >
                            <InfoWindow>
                                < div onClick={this.showInfo.bind(this, mechanic)}>
                                     {mechanic.name},<br/>&#8364; {mechanic.price}
                                </div>
                            </InfoWindow>
                        </Marker>
                    ))}
                </GoogleMap>
            ));

        return (
            <div>
                { !showPayment &&
                    <div id="mapInf">
                        <div id="mapaDisplay">
                            <MapWithAMarker
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDmoL5HOyB_ldN_oOPyclF4_yxj3Uhv1vc&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `100%` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </div>
                            <div id="MechanicInf"></div>
                    </div>
                }
                { showPayment && <PaymentForm cancelPayment={this.cancelPayment.bind(this)}/> }
            </div>
        );
    }
}

export default Map;