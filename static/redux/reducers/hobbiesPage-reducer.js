const SET_HOBBY_CARDS = 'SET-HOBBY-CARDS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const TOTAL_HOBBIES_COUNT = 'TOTAL-HOBBIES-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';

let initialState = {
    hobbyCards: [{
        photo: "http://rs-odessa.org.ua/wp-content/uploads/2016/07/rubikscubes.jpg",
        name: "Хобби", description: {
            telephone: "+7-123-456-78-90",
            email: "hobby@mail.ru",
            location: "ул.Тимирязева, д.7",
            info: "Хобби вашей мечты на улице Тимирязева, дом 7."
        }
    },{
        photo: "http://rs-odessa.org.ua/wp-content/uploads/2016/07/rubikscubes.jpg",
        name: "Хобби", description: {
            telephone: "+7-123-456-78-90",
            email: "hobby@mail.ru",
            location: "ул.Тимирязева, д.7",
            info: "Хобби вашей мечты на улице Тимирязева, дом 7."
        }
    }, {
        photo: "http://rs-odessa.org.ua/wp-content/uploads/2016/07/rubikscubes.jpg",
        name: "Хобби", description: {
            telephone: "+7-123-456-78-90",
            email: "hobby@mail.ru",
            location: "ул.Тимирязева, д.7",
            info: "Хобби вашей мечты на улице Тимирязева, дом 7."
        }
    }],
    pageSize: 3,
    totalHobbiesCount: 0,
    currentPage: 1,
    isFetching: false
};

const hobbiesPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HOBBY_CARDS:
            return {...state, hobbyCards: action.hobbyCards};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case TOTAL_HOBBIES_COUNT:
            return {...state, totalHobbiesCount: action.totalCount};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        default:
            return state;
    }
};

export const setHobbyCards = (hobbyCards) => ({type: SET_HOBBY_CARDS, hobbyCards});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalHobbiesCount = (totalCount) => ({type: TOTAL_HOBBIES_COUNT, totalCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export default hobbiesPageReducer;