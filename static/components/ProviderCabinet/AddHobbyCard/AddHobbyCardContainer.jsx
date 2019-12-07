import React from 'react';
import {connect} from "react-redux";
import {AddHobbyCard} from "./AddHobbyCard";

let mapStateToProps = (state) => {
    return {
        organization: state.providerCabinet.organization,
        telephone: state.providerCabinet.telephone,
        email: state.providerCabinet.email,
        site: state.providerCabinet.site,
        metro: state.providerCabinet.metro,
        adress: state.providerCabinet.adress,
        info: state.providerCabinet.info,
        imageUrl: state.providerCabinet.imageUrl
    };
};

export default connect(mapStateToProps)(AddHobbyCard);