import React, {Component} from 'react';
import s from './SearchContent.module.css';
import HobbySelect from "./HobbySelect/HobbySelect";

class SearchContent extends React.Component {

    render() {
        return (<div className={s.body}>
            <HobbySelect />
        </div>);
    }
}

export default SearchContent;