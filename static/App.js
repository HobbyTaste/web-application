import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Hobbies from './components/Hobbies/Hobbies'
import UserCabinet from "./components/UserCabinet/UserCabinet";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProviderCabinet from "./components/ProviderCabinet/ProviderCabinet";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/reducers/app-reducer";
import UserCabinetContainer from "./components/UserCabinet/UserCabinetContainer";
import Preloader from "./components/Common/Preloader/Preloader";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        /*if (!this.props.initialized) {
            return <Preloader />;
        }*/
            return (
                    <div className="app-wrapper">
                        <HeaderContainer/>
                        <div className="app-wrapper-content">
                            <Route exact path="/" render={() => <MainPage/>}/>
                            <Route exact path="/hobbies" render={() => <Hobbies/>}/>
                            <Route exact path="/user_cabinet" render={() => <UserCabinet/>}/>
                            <Route exact path="/provider_cabinet" render={() => <ProviderCabinet/>}/>
                        </div>
                    </div>
            );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);