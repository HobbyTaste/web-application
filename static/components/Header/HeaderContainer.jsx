import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout, setIsUserInCabinet} from "../../redux/reducers/auth-reducer";

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth || state.providerCabinet.providerIsAuth,
    name: state.auth.name || state.providerCabinet.name,
});

export default connect(mapStateToProps, {logout, setIsUserInCabinet})(Header);
