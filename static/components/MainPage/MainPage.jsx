import React, {Component} from 'react';
import s from './MainPage.module.css';
import SearchContent from "./SearchContent/SearchContent";
import Footer from "../Footer/Footer";
import {initializeApp} from "../../redux/reducers/app-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeMainPage} from "../../redux/reducers/mainPage-reducer";
import Preloader from "../Common/Preloader/Preloader";

class MainPage extends React.Component {
    componentDidMount() {
        this.props.initializeMainPage();
    }
    render() {
        if (!this.props.initializedMainPage) {
            return <Preloader />;
        }
        return (<div>
            <div className={s.background}> </div>
            <SearchContent/>
            <Footer/>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    initializedMainPage: state.mainPage.initializedMainPage
});

export default compose(connect(mapStateToProps, {initializeMainPage}))(MainPage);