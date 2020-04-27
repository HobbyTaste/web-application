import axios from 'axios';
import { findHobbies, toggleAddingProgress } from '../reducers/hobbiesPage-reducer';
import { stopSubmit } from 'redux-form';
import * as actionTypes from './actionsTypes';
import { someFail } from './userActions';
import {reset} from 'redux-form'
// Actions:
const initializedHobbyPage = (initialized) => ({
    type: actionTypes.INITIALIZE_HOBBY_PAGE,
    initialized
});
const changeComments = comment => ({
    type: actionTypes.ADD_RESPONSE,
    comment
});

const setHobbyData = payload =>({
    type: actionTypes.SET_HOBBY_DATA,
    payload,
})

// теперь какие-то функции....
//
const getData = () => new Promise(resolve => {
    setTimeout(() => resolve( {data: {label: "Название" ,metro: "Новая станция", description:"Описание", contact:{mobile: "+7 999", email: "ааа"}, flag:{isParking: false,
                isBeginner: true,
                isRent: false,}}}), 2000)
})

export const initializeHobbyPage = (hobbyID) => (dispatch) => {
    console.log("initialize hobby page")
    /*axios.post('http://127.0.0.1:8080/user/subscribe', {
        hobbyId: hobbyID
    })
     */
    //запрос к серверу вместо этой функции getData
    getData().then(res => {
        let promise = dispatch(setHobbyData(res.data));
        return (Promise.all([promise]).then(()=> {
            dispatch(initializedHobbyPage(true));
        }))
    })
        .catch(err => {
            dispatch(someFail(err))
        })
}


/*добавить отзыв. Отправляем is пользователя, id хобби, для которого этот отзыв.
Хотим, чтобы в бд автоматически сохранилась текущая дата к этому отзыву. Вернуть обновленный массив отзывов.*/
export const addUserFeedback = (hobbyID, userID, values) => (dispatch) => {
    console.log("addUserFeedback")
    axios.post('http://127.0.0.1:8080/user/subscribe', {
        hobbyId: hobbyID,
        text: values.TextFeedback,
        stars: values.StarsRating,
    }).then(res => {
        dispatch(reset('addFeedback'));
        dispatch(changeComments(res.data.comments));
    })
        .catch(err => {
            dispatch(someFail(err))
        })
}

/*Добавить ответ провайдера на отзыв. Отправляем id провайдера, хобби. Хотим, чтобы вернулся обновленный массив отзывов и ответов.*/
export const addProviderResponse = (hobbyID, providerID, values) => (dispatch) => {
    console.log("addProviderResponse")
    axios.post('http://127.0.0.1:8100/user/subscribe', {
        hobbyId: hobbyID,
        values: values,
    }).then(res => {
        console.log("addProvider Responce")
        console.log(res)
        dispatch(changeComments(res.data.comments));
    })
        .catch(err => {
            dispatch(someFail(err))
        })
}
