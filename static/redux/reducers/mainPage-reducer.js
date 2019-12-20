import {getMetroStations} from "../../api/Geo";

/*const INSTALL_HOBBY = 'SELECT-HOBBY';
const INSTALL_METRO = 'SELECT-METRO';*/
const SET_HOBBIES = 'SET-HOBBIES';
const SET_METRO_STATIONS = 'SET-METRO-STATIONS';
const SET_STATIONS_TO_SELECT = 'SET-STATIONS-TO-SELECT';
const SUBMIT = 'SUBMIT';

let initialState = {
    hobbies: [
        {value: 'футбол', label: 'футбол'}
    ],
    metroStations: [],
    metroStationsToSelect: [],
    isSubmit: false
    /*selectedHobby: '',
    selectedMetroStation: ''*/
};

const mainPageReducer = (state = initialState, action) => {
    switch(action.type) {
        /*case INSTALL_HOBBY:
            return {...state,
                selectedHobby: action.hobby
            };
        case INSTALL_METRO:
            return {...state,
                selectedMetroStation: action.metro
            };*/
        case SET_HOBBIES:
            return {
                ...state, hobbies: action.hobbies
            };
        case SET_METRO_STATIONS:
            console.log("ok");
            return {
                ...state, metroStations: action.stations,
            };
        case SET_STATIONS_TO_SELECT:
            return {
              ...state, metroStationsToSelect: action.stationsToSelect
            };
        case SUBMIT:
            return {
                ...state, isSubmit: true
            };
        default:
            return state;
    }
};

export const setHobbies = () => {
    return (
        [   {label: 'A', value: 'A'},
            {label: 'B', value: 'B'},
            {label: 'C', value: 'C'},
            {label: 'D', value: 'D'}
        ]
    );
};

/*export const installHobbyAC = (hobby) => ({type: INSTALL_HOBBY, hobby});
export const installMetroAC = (metro) => ({type: INSTALL_METRO, metro});*/
/*export const setHobbies = (hobbies) => ({ type: SET_HOBBIES, hobbies});*/
export const setMetroStations = (stations) => ({ type: SET_METRO_STATIONS, stations});
export const setStationsToSelect = (stationsToSelect) => ({ type: SET_STATIONS_TO_SELECT, stationsToSelect});
export const setSubmit = () => ({type: SUBMIT});
    export default mainPageReducer;

export const getMetro = () => (dispatch) => {
    return getMetroStations()
        .then((response) => {
            let metroStations = response;
            /*let metroStations = response.map(station => station.caption);*/
            // debugger;
            // return metroStations;
            dispatch(setMetroStations(metroStations));
            let tmpAns = response.map(station => station.caption);
            let ans = tmpAns.map(station => ({label: station,
                                                        value: station}));
            dispatch(setStationsToSelect(ans));
            /*let {id, caption, line} = response;*/
                // dispatch(setMetroStations(metroStations));
        })
};