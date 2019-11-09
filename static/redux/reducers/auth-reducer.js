import {stopSubmit} from "redux-form";
import user from "../../api/User";

const SET_USER_DATA = 'SET-USER-DATA';

let initialState = {
    name: null,
    email: null,
    /*login: null,*/
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

export const setAuthUserData = (name, email, isAuth) =>
    ({type: SET_USER_DATA, payload:{name, email, isAuth}});
export default authReducer;

export const login = (email, password) => (dispatch) => {
    userApi.login(email, password)
        .then((response) => {
            debugger;
            if (response === null) {
                dispatch(setAuthUserData(null, email, true));
                return;
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
            dispatch(setAuthUserData(name, email, true));
            return;
        }
        else {
            alert("error_create");
        }
    })
};

export const logout = () => (dispatch) => {
    userApi.logout()
        .then(response => {
            if(response.status === 200) {
                dispatch(setAuthUserData(null, null, false));

            }
        });
};