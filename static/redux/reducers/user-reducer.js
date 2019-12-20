const SET_MY_HOBBIES = 'SET_MY_HOBBIES';
const ADD_MY_HOBBY = 'ADD_MY_HOBBY';
const DELETE_MY_HOBBY = 'DELETE_MY_HOBBY';

let initialState = {
    myHobbyCards: []
};

const UserCabinetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_HOBBIES:
            return {...state , myHobbyCards: action.myHobbyCards};
        case ADD_MY_HOBBY:
            let myNewHobby = {
                photo: action.photo,
                name: action.name,
                id: action.id,
                description: action.description
            };
            return {...state, myHobbyCards: [...state.myHobbyCards, myNewHobby]};
        case DELETE_MY_HOBBY:
            return {...state,
                myHobbyCards: state.myHobbyCards.filter(function(hobbyId) {
                    return hobbyId.id !== action.id
                })
            };
        default:
            return state;
    }
};
export const addMyHobby = (photo, name, id, description) => ({ type: ADD_MY_HOBBY, photo, name, id, description});
export const deleteMyHobby = (id) => ({type: DELETE_MY_HOBBY, id});

export default UserCabinetReducer;