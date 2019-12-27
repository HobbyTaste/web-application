import React from 'react';
import ReactDOM from 'react-dom';
import store from "./redux/store";
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';


function render() {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>, document.getElementById('root'));
}

window.addEventListener('DOMContentLoaded', render);
