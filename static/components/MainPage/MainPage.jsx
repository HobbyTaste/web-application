import React, {Component} from 'react';
import s from './MainPage.module.css';
import SearchContent from "./SearchContent/SearchContent";
import Footer from "../Footer/Footer";
import ModalExampleControlled from "../ModalWindow/ModalWindow";
import SimpleModal from "../ModalWindow/ModalWindow";

const MainPage = (props) => {
    return (<div>
        <div className={s.background}> </div>

       {/* <ModalExampleControlled />*/}
            <SearchContent />
        <Footer />
    </div>);
};

export default MainPage;