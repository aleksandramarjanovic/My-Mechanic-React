import React from 'react';
import Map from "./Map";
import StartMechanic from "./StartMechanic";

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            startMechanicPage: true,
            mapPage: false
        };
    }
    render(){
	    const FindMechanic = (event) => {
            this.setState({
              startMechanicPage: false,
              mapPage: true

            });
        }
        return (
            <div>
                <div>
                    {this.state.startMechanicPage && <StartMechanic findMechanic={FindMechanic}/>}
                    {this.state.mapPage &&
                        <div style={{width: '100%', height: '100%'}}>
                            <Map/>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default App;
