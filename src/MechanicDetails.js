import React from 'react';
import PaymentForm from './PaymentForm';

class MechanicDetails extends React.Component {

    constructor (props) {
        super(props);
    }

    render(){

        return (
            <div id="info">
                <div id="allAboutMechanic">
                    <div id="title">
                         {this.props.mechanic.name} <br/>
                    </div>
                         <img id="pictureCar" src="automehanicar.jpg" alt=" "/> <br/>
                         <img id ="placeIcon" src="location.png" alt= " "/>
                         {this.props.mechanic.address} <br/>

                    <div id="about">
                        <div id="titleAbout"> About us: </div>  <br/>
                          {this.props.mechanic.description}<br/>
                    </div>
                    <div id="Phone">
                         <img id ="callIcon" src="call.png" alt = " "/>
                          {this.props.mechanic.phoneNumber}
                    </div> <br/>
                     <button id="hireButton" onClick={this.props.showPayment}> Hire me  {this.props.mechanic.price}&#8364;</button>
                </div>
            </div>
        );
    }
}

export default MechanicDetails;