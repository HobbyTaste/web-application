import axios from 'axios';
import { findHobbies, toggleAddingProgress } from '../reducers/hobbiesPage-reducer';
import { stopSubmit } from 'redux-form';
import * as actionTypes from './actionsTypes';
import UserApi from '../../api/User'

const userApi=new UserApi();

export const setAuthUserData = (id, email, name, avatar, isAuth) => ({
    type: actionTypes.SET_USER_DATA,
    id,
    email,
    name,
    avatar,
    isAuth
});
const setUserHobbies = (userHobbies) => ({
    type: actionTypes.SET_HOBBIES,
    userHobbies
});
const changeUserHobby=(userHobbies) => ({
    type: actionTypes.CHANGE_HOBBY_USER,
    userHobbies
})

const initializeUser = (initialize) => ({
    type: actionTypes.INITIALIZE_USER_SUCCESS,
    initialize
});
export const setIsUserInCabinet = (status) => ({
    type: actionTypes.SET_IS_USER_IN_CABINET,
    status
});
export const someFail = error => ({
        type: actionTypes.SOME_FAIL,
        error: error
    }
);
const getData = () => new Promise(resolve => {
    setTimeout(() => resolve( {data: {hobbies: [1, 2]}}), 1000)
})

// функции, отпраправляющие запросы....
/*добавить хобби. Отправляем id хобби и юзера, если успех, хотим получить обновленный массив подписок*/
export const addHobbyForUser = (hobbyID, userID) => (dispatch) => {
  axios.post('/user/subscribes', {
        hobbyId: hobbyID,
        userId: userID
    }).then(res => {
        console.log("responce add")
        console.log(res)
        dispatch(changeUserHobby(res.data.hobbies));
    })
        .catch(err => {
            dispatch(someFail(err))
        })
}


/*удалить хобби. Отправляем id хобби и юзера, если успех, хотим получить обновленный массив подписок*/
export const deleteHobbyForUser = (hobbyID, userID) => (dispatch) => {
    axios.post('http://127.0.0.1:8100/user/subscribe', {
        hobbyId: hobbyID,
        userId: userID
    }).then(res => {
        console.log("responce delete")
        console.log(res)
        dispatch(changeUserHobby(res.data.hobbies));
    })
        .catch(err => {
            dispatch(someFail(err))
        })
}

export const initializeUserCabinet = () => (dispatch) => {
    dispatch(initializeUser(false));
    dispatch(setIsUserInCabinet(true));
    let promise = dispatch(getAuthUserData());
    let promise2 = dispatch(getUserHobbies());
    Promise.all([promise, promise2])
        .then(() => {
            dispatch(initializeUser(true));
        });
};

export const getUserHobbies = () => (dispatch) => {
    userApi.getHobbies()
        .then((response) => {
            if (response.ok) {
                response.json()
                    .then(body => {
                        dispatch(setUserHobbies(body));
                    });
            }
        });
};

export const addNewHobby = (hobbyID, type, metro) => (dispatch) => {
    userApi.addHobby(hobbyID)
        .then((response) => {
            dispatch(toggleAddingProgress(true, hobbyID));
            if (response.ok) {
                dispatch(getUserHobbies());
                dispatch(findHobbies(type, metro));
            }
        });
    dispatch(toggleAddingProgress(false, hobbyID));
};

export const getAuthUserData = () => (dispatch) => userApi.getInfo()
    .then((response) => {
        if (typeof response === 'object') {
            const { id, name, email, avatar } = response;
            dispatch(setAuthUserData(id, email, name, avatar, true));
        }
    });

export const login = (email, password) => (dispatch) => {
    userApi.login(email, password)
        .then((response) => {
            if (response === null) {
                dispatch(getAuthUserData());
                dispatch(getUserHobbies());
            } else if (response.login) {
                dispatch(stopSubmit('login', { email: 'Неверный email' }));
            } else if (response.password) {
                dispatch(stopSubmit('login', { password: 'Неверный пароль' }));
            }
        });
};

export const createNewUser = (email, password, name, avatar) => (dispatch) => {
    const obj = {
        password: password,
        name: name,
        avatar: avatar,
        email: email
    };
    userApi.create(obj)
        .then((response) => {
            if (response.ok) {
                dispatch(getAuthUserData());
            }
        });
};

export const logout = () => (dispatch) => {
    userApi.logout()
        .then((response) => {
            if (response === null) {
                dispatch(setAuthUserData(null, null, null,
                    null, false));
                dispatch(initializeUser(false));
                dispatch(setIsUserInCabinet(false));
            }
        });
};

export const userEdit = (editData) => (dispatch) => {
    userApi.edit(editData)
        .then((response) => {
            if (response.ok) {
                dispatch(getAuthUserData());
            } else {
                response.json()
                    .then(console.log);
            }
        });
};
