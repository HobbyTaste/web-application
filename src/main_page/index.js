import ReactDOM from "react-dom";
import React from "react";
import HomePage from "./main_page";
import {BrowserRouter as Router, Route} from 'react-router-dom';

class Page extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path='/'>
                    <HomePage/>
                </Route>
            </Router>
            );
    }
}

ReactDOM.render(<Page/>, document.getElementById('root'));
