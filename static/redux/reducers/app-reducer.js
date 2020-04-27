import {getAuthUserData, setIsUserInCabinet} from "../actions/userActions";
import {getMetro} from "./mainPage-reducer";
import {getAuthProviderData} from "../actions/providerActions";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch) => {
    dispatch(setIsUserInCabinet(false));
    let promise = dispatch(getAuthUserData());
    let promise2 = dispatch(getAuthProviderData());
    Promise.all([promise, promise2])
        .then(() => {
            dispatch(initializedSuccess());
        });
};


export default appReducer;
