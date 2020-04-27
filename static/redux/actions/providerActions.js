import { setIsUserInCabinet } from '../reducers/auth-reducer';
import { stopSubmit } from 'redux-form';
import * as actionTypes from './actionsTypes';
import axios from 'axios';
import { someFail } from './userActions';
import ProviderApi from '../../api/Provider'

const providerApi=new ProviderApi();

export const setAuthProviderData = (avatar, email, id, info, name, phone, providerIsAuth) =>
    ({type: SET_PROVIDER_DATA, avatar, email, id, info, name, phone, providerIsAuth});
export const initializeProvider = (status) => ({type: INITIALIZE_PROVIDER_SUCCESS, status});
export const setProviderHobbies = (providerHobbies) => ({type: SET_PROVIDER_HOBBIES, providerHobbies});


const changeProviderHobby=(userHobbies) => ({
    type: actionTypes.CHANGE_HOBBY_USER,
    userHobbies
})

/*добавить хобби. Отправляем id хобби и провайдера, если успех, хотим получить обновленный массив подписок*/
export const addHobbyForProvider = (hobbyID, userID) => (dispatch) => {
    console.log("provider add")
    axios.post('http://127.0.0.1:8100/user/subscribe', {
        hobbyId: hobbyID,
        userId: userID
    }).then(res => {
        console.log("responce add")
        console.log(res)
        dispatch(changeProviderHobby(res.data.hobbies));
    })
        .catch(err => {
            dispatch(someFail(err))
        })
}
/*удалить хобби. Отправляем id хобби и провайдера, если успех, хотим получить обновленный массив подписок*/
export const deleteHobbyForProvider = (hobbyID, providerID) => (dispatch) => {
    axios.post('http://127.0.0.1:8100/user/subscribe', {
        hobbyId: hobbyID,
        providerId: providerID
    }).then(res => {
        console.log("responce delete")
        console.log(res)
        dispatch(changeProviderHobby(res.data.hobbies));
    })
        .catch(err => {
            dispatch(someFail(err))
        })
}

//дальше идут старые, которые скорее всего поменяются


export const initializeProviderCabinet = () => (dispatch) => {
    dispatch(initializeProvider(false));
    dispatch(setIsUserInCabinet(false));
    let promise = dispatch(getAuthProviderData());
    let promise2 = dispatch(getProviderHobbies());
    Promise.all([promise, promise2])
        .then(() => {
            dispatch(initializeProvider(true));
        });
};

export const getAuthProviderData = () => (dispatch) => {
    return providerApi.getInfo()
        .then(response => {
            if (response.ok) {
                response.json().then(body => {
                    let {avatar, email, id, info, name, phone} = body;
                    dispatch(setAuthProviderData(avatar, email, id, info, name, phone, true));
                });
            } else {
                response.json().then(console.log);
            }
        });
};

export const getProviderHobbies = () => (dispatch) => {
    return providerApi.getHobbies()
        .then(response => {
            if (response.ok) {
                response.json().then(body => {
                    dispatch(setProviderHobbies(body));
                });
            } else {
                response.json().then(console.log);
            }
        })
};

export const createNewProvider = (name, password, email, avatar, phone, info) => (dispatch) => {
    const providerData = {
        name: name, password: password, email: email, avatar: avatar, phone: phone, info: info
    };
    providerApi.create(providerData).then((response) => {
        if (response.ok) {
            dispatch(getAuthProviderData());
        } else {
            response.json().then(console.log);
        }
    })
};

export const loginProvider = (email, password) => (dispatch) => {
    providerApi.login(email, password).then((response) => {
        if (response.ok) {
            dispatch(getAuthProviderData());
        }
        else {
            response.json().then(
                body => {
                    if(body.login) {
                        dispatch(stopSubmit("providerLogin", {email: "Неверный email"}));
                    }
                    else if(body.password) {
                        dispatch(stopSubmit("providerLogin", {password: "Неверный пароль"}));
                    }
                    else {
                        console.log(body);
                    }
                }
            );
        }
    })
};

export const logoutProvider = () => (dispatch) => {
    providerApi.logout().then((response) => {
        if (response.ok) {
            dispatch(setAuthProviderData(null, null, null, null, null,
                null, false));
        } else {
            response.json().then(console.log);
        }
    })
};

export const addNewHobby = (organization, telephone, email, address, metro, info, providerId, file, category) => (dispatch) => {
    const hobbyData = {
        label: organization, phone: telephone, email: email, address: address, metroStation: metro,
        description: info, shortDescription: info, owner: providerId, avatar: file, category: category
    };
    hobbyApi.add(hobbyData).then((response) => {
        if (response.ok) {
            dispatch(getProviderHobbies())
        }
    })
};

export const providerEdit = (editData) => (dispatch) => {
    providerApi.edit(editData).then((response) => {
        if (response.ok) {
            dispatch(getAuthProviderData());
        } else {
            response.json().then(console.log);
        }
    })
};
