import {createStore, combineReducers} from "redux"
import mainPageReducer from "./reducers/mainPage-reducer";
import hobbiesPageReducer from "./reducers/hobbiesPage-reducer";
import authReducer from "./reducers/auth-reducer";
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
    mainPage: mainPageReducer,
    hobbiesPage: hobbiesPageReducer,
    auth: authReducer,
    form: formReducer});

let store = createStore(reducers);

export default store;