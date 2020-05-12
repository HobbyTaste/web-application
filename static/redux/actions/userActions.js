import axios from "axios";
import { findHobbies, toggleAddingProgress } from "../reducers/hobbiesPage-reducer";
import { stopSubmit } from "redux-form";
import * as actionTypes from "./actionsTypes";
import UserApi from "../../api/User";
import HobbyApi from "../../api/Hobby";
import CommentApi from "../../api/Comment";
import { defaultHobbyProps, comments } from "../../utils/constant";

const testLogin = "bob@test.com";
const testPassword = "bob";

const userApi = new UserApi();
const hobbyApi = new HobbyApi();
const commentApi = new CommentApi();

export const setCurrentUserInfo = (id, email, name, avatar, isAuth) => ({
    type: actionTypes.SET_USER_DATA,
    id,
    email,
    name,
    avatar,
    isAuth,
});
const setUserHobbies = (userHobbies) => ({
    type: actionTypes.SET_HOBBIES,
    userHobbies,
});
const setUserComments = (userComments) => ({
    type: actionTypes.SET_COMMENTS,
    userComments,
});
const changeUserHobby = (userHobbies) => ({
    type: actionTypes.CHANGE_HOBBY_USER,
    userHobbies,
});

const initializeUser = (initialize) => ({
    type: actionTypes.INITIALIZE_USER_SUCCESS,
    initialize,
});
const fetchingHobbies = (status) => ({
    type: actionTypes.SET_FETCHING_HOBBIES,
    status,
});
export const setIsUserInCabinet = (status) => ({
    type: actionTypes.SET_IS_USER_IN_CABINET,
    status,
});
export const someFail = (error) => ({
    type: actionTypes.SOME_FAIL,
    error: error,
});
const getData = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve({ data: { hobbies: [1, 2] } }), 1000);
    });

// функции, отпраправляющие запросы....
/*добавить хобби. Отправляем id хобби и юзера, если успех, хотим получить обновленный массив подписок*/
export const addHobbyForUser = (hobbyID) => (dispatch) => {
  axios.get(`/restapi/hobby/subscribe?id=${hobbyID}`).then(res => {
        console.log("responce add")
        console.log(res)
        dispatch(changeUserHobby(res.data.hobbies));
    })
        .catch(err => {
            dispatch(someFail(err))
        })
        .then((res) => {
            console.log("responce add");
            console.log(res);
            dispatch(changeUserHobby(res.data.hobbies));
        })
        .catch((err) => {
            dispatch(someFail(err));
        });
};

/*удалить хобби. Отправляем id хобби и юзера, если успех, хотим получить обновленный массив подписок*/
export const deleteHobbyForUser = (hobbyID) => (dispatch) => {
    axios.get(`/restapi/hobby/subscribe?id=${hobbyID}`).then(res => {
        console.log("responce delete")
        console.log(res)
        dispatch(changeUserHobby(res.data.hobbies));
    })
        .catch(err => {
            dispatch(someFail(err))
        })
        .then((res) => {
            console.log("responce delete");
            console.log(res);
            dispatch(changeUserHobby(res.data.hobbies));
        })
        .catch((err) => {
            dispatch(someFail(err));
        });
};

export const initializeUserCabinet = () => async dispatch => {
    dispatch(initializeUser(false));
    await userApi.login(testLogin, testPassword);
    await dispatch(getCurrentUserInfo());
    await dispatch(getUserComments());
    dispatch(initializeUser(true));
    dispatch(setIsUserInCabinet(true));
};

function getUserComments() {
    return async dispatch => {
        const responseBody = await (await userApi.getComments()).json();
        dispatch(setUserComments(responseBody));
    };
}

export const initializeUserHobbies = () => async (dispatch) => {
    dispatch(fetchingHobbies("loading"));
    await dispatch(getUserHobbies());
    dispatch(fetchingHobbies("success"));
};

function firstLettersToUpperCase(text) {
    return text
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

function truncateHobbyForSlot(hobby) {
    return {
        pic: hobby.avatar || defaultHobbyProps.imageUrl,
        name: hobby.label,
        metro: firstLettersToUpperCase(hobby.metroStation),
        address: hobby.address,
        price: hobby.price ? hobby.price.title : defaultHobbyProps.price,
        // Не очень понятно, где это на бэкенде
        priceTime: defaultHobbyProps.priceTIme,
        priceCurriculum: defaultHobbyProps.priceCurriculum,
        isParking: hobby.parking,
        isBeginner: hobby.novice,
        isRent: hobby.equipment,
    };
}

function getUserHobbies() {
    return async dispatch => {
        const responseBody = await (await userApi.getHobbies()).json();
        const truncatedHobbies = responseBody.map((hobby) => truncateHobbyForSlot(hobby));
        dispatch(setUserHobbies(truncatedHobbies));
    }
}

export const addNewHobby = (hobbyID, type, metro) => (dispatch) => {
    userApi.addHobby(hobbyID).then((response) => {
        dispatch(toggleAddingProgress(true, hobbyID));
        if (response.ok) {
            dispatch(getUserHobbies());
            dispatch(findHobbies(type, metro));
        }
    });
    dispatch(toggleAddingProgress(false, hobbyID));
};

export const getCurrentUserInfo = () => (dispatch) =>
    userApi.getInfo().then((response) => {
        if (typeof response === "object") {
            const { id, name, email, avatar } = response;
            dispatch(setCurrentUserInfo(id, email, name, avatar, true));
        }
    });

export const login = (email, password) => (dispatch) => {
    userApi.login(email, password).then((response) => {
        if (response === null) {
            dispatch(getCurrentUserInfo());
            dispatch(getUserHobbies());
        } else {
            dispatch(stopSubmit("login", { error: "Неверный email или пароль" }));
        }
    });
};

export const createNewUser = (email, password, name, avatar) => (dispatch) => {
    const obj = {
        password: password,
        name: name,
        avatar: avatar,
        email: email,
    };
    userApi.create(obj).then((response) => {
        if (response.ok) {
            dispatch(getCurrentUserInfo());
        } else  {
            dispatch(stopSubmit("registration", { error: "Пользователь уже сущеcтвует" }));
        }

    });
};

export const logout = () => (dispatch) => {
    userApi.logout().then((response) => {
        if (response === null) {
            dispatch(setCurrentUserInfo(null, null, null, null, false));
            dispatch(initializeUser(false));
            dispatch(setIsUserInCabinet(false));
        }
    });
};

export const userEdit = (editData) => async (dispatch) => {
    await userApi.edit(editData);
    await dispatch(getCurrentUserInfo());
    return dispatch(getUserComments());
};
