import React, {Component} from 'react';
import s from './MainHobbySearch.module.css';
/*import HobbySearchContainer from './Search/SearchContainer';*/
import {Link} from 'react-router-dom';

class MainHobbySearch extends React.Component {

    render() {
        return (<div>
            {/*<HobbySearchContainer/>*/}
            <Link to="/hobbies">
                <button className={s.button}>Подобрать хобби</button>
            </Link>
        </div>);
    }
}

export default MainHobbySearch;