import React, {Component} from 'react';
import style from './SearchContent.module.css';
import HobbySelect from "./HobbySelect/HobbySelect";

class SearchContent extends React.Component {

    render() {
        return (<div className={style.body}>
            <div className={style.mainTitle}>Поиск Хобби</div>
            <HobbySelect />
        </div>);
    }
}

export default SearchContent;