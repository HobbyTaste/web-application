const SET_HOBBY_CARDS = 'SET-HOBBY-CARDS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const TOTAL_HOBBIES_COUNT = 'TOTAL-HOBBIES-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';

let initialState = {
    hobbyCards: [{
        photo: "https://static.mk.ru/upload/entities/2018/09/13/articles/detailPicture/88/68/4b/6f/1465fb241b8ddf492b3de2bb6899f436.jpg",
        name: "Футбол",
        id: 1,
        description: {
            telephone: "+7-123-456-78-90",
            email: "football@mail.ru",
            location: "м.Тимирязевская, ул.Тимирязева, д.7",
            info: "Футбольная секция для детей и взрослых"
        }
    },{
        photo: "http://www.min2win.ru/images/nails/7097l_300.jpg",
        name: "Шашки",
        id: 2,
        description: {
            telephone: "+7-800-555-35-35",
            email: "chess@mail.ru",
            location: "м.Новослободская, ул.Кравченко, д.53",
            info: "Турниры по шашкам каждую пятницу! Вход свободный."
        }
    }, {
        photo: "https://cdn.fishki.net/upload/post/2016/05/06/1942632/tn/1118full-anna-sidorova.jpg",
        name: "Керлинг",
        id: 3,
        description: {
            telephone: "+7-495-879-78-92",
            email: "kerling@mail.ru",
            location: "м.Марьина Роща, клуб Новая Лига",
            info: "Тренировки с 19 до 21 каждый вторник и четверг."
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