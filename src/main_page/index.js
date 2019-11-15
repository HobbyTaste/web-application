import ReactDOM from "react-dom";
import React from "react";
import HomePage from "./main_page";
import UserCabinet from '../user_cabinet/user_cabinet';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ProviderCabinet from "../provider_cabinet/provider_cabinet";
import NewHobby from "../new_hobby/new_hobby";
import Hobby from '../../static/api/Hobby';

const hobbyApi = new Hobby();

hobbyApi.find('ug').then(resp => resp.json()).then(console.log);

class Page extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path='/'>
                    <HomePage/>
                </Route>
                <Route exact path='/user/cabinet'>
                    <UserCabinet/>
                </Route>
                <Router exact path='/provider/cabinet'>
                    <ProviderCabinet/>
                </Router>
                <Router exact path='/hobby/new'>
                    <NewHobby/>
                </Router>
            </Router>
            );
    }
}

ReactDOM.render(<Page/>, document.getElementById('root'));
