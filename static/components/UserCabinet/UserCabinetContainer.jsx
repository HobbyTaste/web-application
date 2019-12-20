import React, {Component} from 'react';
import {connect} from "react-redux";
import UserCabinet from "./UserCabinet";
import {deleteMyHobby} from "../../redux/reducers/user-reducer";

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        name: state.auth.name,
        myHobbyCards: state.userCabinet.myHobbyCards
    }
};

export default connect(mapStateToProps, {deleteMyHobby})(UserCabinet);