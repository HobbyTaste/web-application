import React, {Component} from 'react';
import {connect} from "react-redux";
import UserCabinet from "./UserCabinet";

const mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        name: state.auth.name
    }
};

export default connect(mapStateToProps, null)(UserCabinet);