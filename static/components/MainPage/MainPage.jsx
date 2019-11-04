import React, {Component} from 'react';
import s from './MainPage.module.css';
import SearchContent from "./SearchContent/SearchContent";
import Footer from "../Footer/Footer";

const MainPage = (props) => {
    return (<div>
        <div className={s.background}> </div>
            <SearchContent />
        <Footer />
    </div>);
};

export default MainPage;