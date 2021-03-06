import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    id: null,
    email: null,
    name: '',
    avatar: null,
    isAuth: false,
    inUserCabinet: false,
    userInitialized: false,
    fetchingHobbies: "no hobbies",

    userHobbies: []
};

const userCabinetReducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.INITIALIZE_USER_SUCCESS: {
        return {
            ...state,
            userInitialized: action.initialize
        };
    }
    case actionTypes.SET_USER_DATA:
        return {
            ...state,
            id: action.id,
            email: action.email,
            name: action.name,
            avatar: action.avatar,
            isAuth: action.isAuth
        };
    case actionTypes.CHANGE_HOBBY_USER:
        return { ...state,
            userHobbies: action.userHobbies};
    case actionTypes.SET_USER_COMMENTS:
        return {
            ...state,
            userComments: action.userComments
        };
    case actionTypes.SET_USER_HOBBIES:
        return {
            ...state,
            userHobbies: action.userHobbies
        };
    case actionTypes.SET_FETCHING_USER_HOBBIES:
        return {
            ...state,
            fetchingHobbies: action.status
        };
    case actionTypes.SET_IS_USER_IN_CABINET:
        return {
            ...state,
            inUserCabinet: action.status
        };
    default:
        return state;
    }
};

export default userCabinetReducer;
