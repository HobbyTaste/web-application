import React, {Component} from 'react';
import s from './SearchContent.module.css';
import MainHobbySearch from "./MainHobbySearch";

class SearchContent extends React.Component {

    render() {
        return (<div className={s.body}>
            <MainHobbySearch />
        </div>);
    }
}

export default SearchContent;