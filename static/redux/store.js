import {applyMiddleware,createStore, compose, combineReducers} from "redux"
import mainPageReducer from "./reducers/mainPage-reducer";
import hobbiesPageReducer from "./reducers/hobbiesPage-reducer";
import authReducer from "./reducers/auth-reducer";
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";
import appReducer from "./reducers/app-reducer";
import ProviderCabinetReducer from "./reducers/provider-reducer";
import UserCabinetReducer from "./reducers/user-reducer";

let reducers = combineReducers({
    mainPage: mainPageReducer,
    hobbiesPage: hobbiesPageReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    providerCabinet: ProviderCabinetReducer,
    userCabinet: UserCabinetReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;