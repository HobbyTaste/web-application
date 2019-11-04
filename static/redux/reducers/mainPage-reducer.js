const INSTALL_HOBBY = 'SELECT-HOBBY';
const INSTALL_METRO = 'SELECT-METRO';
const SET_HOBBIES = 'SET-HOBBIES';
const SET_METRO_STATIONS = 'SET-METRO-STATIONS';

let initialState = {
    hobbies: [
        {value: 'футбол', label: 'футбол'},
        {value: 'баскетбол', label: 'баскетбол'},
        {value: 'шахматы', label: 'шахматы'},
        {value: 'тенис', label: 'тенис'},
        {value: 'керлинг', label: 'керлинг'},
        {value: 'игры', label: 'игры'},
        {value: 'плавание', label: 'плавание'}
    ],
    metroStations: [
        {value: 'тимирязевская', label: 'тимирязевская'},
        {value: 'менделеевская', label: 'менделеевская'},
        {value: 'новослободская', label: 'новослободская'}
    ],
    selectedHobby: '',
    selectedMetroStation: ''
};

const mainPageReducer = (state = initialState, action) => {
    switch(action.type) {
        case INSTALL_HOBBY:
            return {...state,
                selectedHobby: action.hobby
            };
        case INSTALL_METRO:
            return {...state,
                selectedMetroStation: action.metro
            };
        case SET_HOBBIES:
            return {
                ...state, hobbies: action.hobbies
            };
        case SET_METRO_STATIONS:
            return {
                ...state, metroStations: action.metroStations
            };
        default:
            return state;
    }
};

export const installHobbyAC = (hobby) => ({type: INSTALL_HOBBY, hobby});
export const installMetroAC = (metro) => ({type: INSTALL_METRO, metro});
export const setHobbies = (hobbies) => ({ type: SET_HOBBIES, hobbies});
export const setMetroStations = (stations) => ({ type: SET_METRO_STATIONS, stations});
export default mainPageReducer;