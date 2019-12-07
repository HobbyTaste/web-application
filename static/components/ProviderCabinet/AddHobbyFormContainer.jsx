import React from 'react';
import {
    reset,
    setAdress,
    setEmail,
    setImage,
    setInfo,
    setMetro,
    setOrganization,
    setSite,
    setTelephone
} from "../../redux/reducers/provider-reducer";
import {AddHobbyForm} from "./AddHobby";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        organization: state.providerCabinet.organization,
        telephone: state.providerCabinet.telephone,
        email: state.providerCabinet.email,
        site: state.providerCabinet.site,
        metro: state.providerCabinet.metro,
        adress: state.providerCabinet.adress,
        info: state.providerCabinet.info,
        file: state.providerCabinet.file,
        imageUrl: state.providerCabinet.imageUrl
    };
};

export default connect(mapStateToProps, {setOrganization, setTelephone, setEmail, setSite,
                                            setMetro, setAdress, setInfo, setImage, reset})(AddHobbyForm);