import {stopSubmit} from "redux-form";
import user from "../../api/User";

const SET_USER_DATA = 'SET-USER-DATA';

let initialState = {
    id: null,
    email: null,
    name: null,
    isAuth: false
};
const userApi = new user();

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export const setAuthUserData = (id, email, name, isAuth) =>
    ({type: SET_USER_DATA, payload:{id, email, name, isAuth}});
export default authReducer;

export const login = (email, password) => (dispatch) => {
    userApi.login(email, password)
        .then((response) => {
            if (response === null) {
                dispatch(getAuthUserData());
            }
            else {
                if(response.login) {
                    dispatch(stopSubmit("login", {email: "Неверный email"}));
                }
                else if(response.password) {
                    dispatch(stopSubmit("login", {password: "Неверный пароль"}));
                }
            }
        })
};

export const createNewUser = (email, password, name) => (dispatch) => {
    userApi.create(email, password, name).then((response) => {
        if (response === null) {
            dispatch(getAuthUserData());
            /*dispatch(setAuthUserData(1, email, name, true));*/
        }
        else {
            alert("error_create");
        }
    })
};

export const logout = () => (dispatch) => {
    userApi.logout()
        .then(response => {
            if(response === null) {
                dispatch(setAuthUserData(null, null, null,false));
            }
        });
};

export const getAuthUserData = () => (dispatch) => {
    return userApi.getInfo()
        .then(response => {
            if(typeof response === 'object') {
                let {id, name, email} = response;
                dispatch(setAuthUserData(id, email, name, true));
            }
        });
};