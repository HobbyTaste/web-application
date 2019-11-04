/*
import React from 'react';
import {connect} from "react-redux";
import {installHobbyAC, installMetroAC} from "../../../../redux/reducers/mainPage-reducer";
import HobbySearch from "./HobbySearch";
import MetroSearch from "./MetroSearch";

class SearchContainer extends React.Component {
    state = {
        selectedHobby: '',
        selectedMetro: ''
    };

    hobbyChange = (selectedHobby) => {
        this.props.installHobby(selectedHobby);
        this.setState(
            { selectedHobby }
        );
    };
    metroChange = (selectedMetro) => {
        this.props.installMetro(selectedMetro);
        this.setState(
            { selectedMetro }
        );
    };
    render() {
        const { selectedHobby } = this.state.selectedHobby;
        const {selectedMetro} = this.state.selectedMetro;
        return (
            <div>
            <HobbySearch selectedHobby={selectedHobby} hobbyChange={this.hobbyChange} hobbies={this.props.hobbies}/>
            <MetroSearch selectedMetro={selectedMetro} metroChange={this.metroChange} stations={this.props.stations}/>
            </div>);
    }
}

let mapStateToProps = (state) => {
    return {
        hobbies: state.mainPage.hobbies,
        stations: state.mainPage.metroStations
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        installHobby: ({hobby}) => {
            dispatch(installHobbyAC(hobby));
        },
        installMetro: (metro) => {
            dispatch(installMetroAC(metro))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
*/
