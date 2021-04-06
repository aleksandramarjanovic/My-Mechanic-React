
const React = require('react');


class StartMechanic extends React.Component{

    render () {

        return (
            <div id="firstPage">
                <div id="background">
                </div>
                <div id="startMap">
                    <button id="OpenMap" onClick={this.props.findMechanic}>FIND MECHANIC </button>
                </div>
            </div>
        )
     };
}

export default StartMechanic
