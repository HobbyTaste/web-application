import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setInCabinet, setOutCabinet, logout} from "../../redux/reducers/auth-reducer";

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    inUserCabinet: state.auth.inUserCabinet
});

export default connect(mapStateToProps, {setInCabinet, setOutCabinet, logout})(Header);