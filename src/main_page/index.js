import ReactDOM from "react-dom";
import React from "react";
import HomePage from "./main_page";
import UserCabinet from '../user_cabinet/user_cabinet';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ProviderCabinet from "../provider_cabinet/provider_cabinet";
import NewHobby from "../new_hobby/new_hobby";

class Page extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path='/'>
                    <HomePage/>
                </Route>
                <Route exact path='/user'>
                    <UserCabinet/>
                </Route>
                <Router exact path='/provider'>
                    <ProviderCabinet/>
                </Router>
                <Router exact path='/newHobby'>
                    <NewHobby/>
                </Router>
            </Router>
            );
    }
}

ReactDOM.render(<Page/>, document.getElementById('root'));