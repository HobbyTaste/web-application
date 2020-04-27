import {getMetroStations} from "../../api/Geo";
import Hobby from "../../api/Hobby";
import {setIsUserInCabinet} from "../actions/userActions";

const SET_HOBBIES_TO_SELECT = 'SET_HOBBIES_TO_SELECT';
const SET_METRO_STATIONS = 'SET-METRO-STATIONS';
const SET_STATIONS_TO_SELECT = 'SET-STATIONS-TO-SELECT';
const INITIALIZED_MAIN_PAGE_SUCCESS = 'INITIALIZED_MAIN_PAGE_SUCCESS';

const hobbyApi = new Hobby();

let initialState = {
    hobbiesToSelect: [],
    metroStations: [],
    metroStationsToSelect: [],
    initializedMainPage: false
};

const mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HOBBIES_TO_SELECT:
            return {
                ...state, hobbiesToSelect: action.hobbiesToSelect
            };
        case SET_METRO_STATIONS:
            return {
                ...state, metroStations: action.stations,
            };
        case SET_STATIONS_TO_SELECT:
            return {
                ...state, metroStationsToSelect: action.stationsToSelect
            };
        case INITIALIZED_MAIN_PAGE_SUCCESS:
            return {
                ...state, initializedMainPage: action.initialize
            };
        default:
            return state;
    }
};

export const setHobbiesToSelect = (hobbiesToSelect) => ({type: SET_HOBBIES_TO_SELECT, hobbiesToSelect});
export const setMetroStations = (stations) => ({type: SET_METRO_STATIONS, stations});
export const setStationsToSelect = (stationsToSelect) => ({type: SET_STATIONS_TO_SELECT, stationsToSelect});
export const initializedMainPageSuccess = (initialize) => ({type: INITIALIZED_MAIN_PAGE_SUCCESS, initialize});
export default mainPageReducer;

export const getMetro = () => (dispatch) => {
    return getMetroStations()
        .then((response) => {
            let metroStations = response;
            dispatch(setMetroStations(metroStations));
            let tmpAns = response.map(station => station.caption);
            let idAndStation = response.map(station => ({label: station.caption, id: station.id}));
            let ans = idAndStation.map(station => ({
                label: station.label,
                value: station.id
            }));
            dispatch(setStationsToSelect(ans));
        })
};

function removeDuplicates(arr) {
    const result = [];
    const duplicatesIndices = [];
    arr.forEach((current, index) => {
        if (duplicatesIndices.includes(index)) return;
        result.push(current);
        for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {
            const comparison = arr[comparisonIndex];
            const currentKeys = Object.keys(current);
            const comparisonKeys = Object.keys(comparison);
            if (currentKeys.length !== comparisonKeys.length) continue;
            const currentKeysString = currentKeys.sort().join("").toLowerCase();
            const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
            if (currentKeysString !== comparisonKeysString) continue;
            let valuesEqual = true;
            for (let i = 0; i < currentKeys.length; i++) {
                const key = currentKeys[i];
                if ( current[key] !== comparison[key] ) {
                    valuesEqual = false;
                    break;
                }
            }
            if (valuesEqual) duplicatesIndices.push(comparisonIndex);
        }
    });
    return result;
}

export const getHobbies = (hobbyType) => (dispatch) => {
    const obj = {category: hobbyType};
    return hobbyApi.getWithFilter(obj)
        .then((response) => {
            if (response.ok) {
                response.json().then(body => {
                    let ans = body.map(hobby => ({
                        label: hobby.label,
                        value: hobby.label
                    }));
                    const filteredLabels = removeDuplicates(ans);
                    dispatch(setHobbiesToSelect(filteredLabels));
                });
            } else {
                response.json().then(console.log);
            }
        })
};

export const initializeMainPage = (hobbyType) => (dispatch) => {
    dispatch(initializedMainPageSuccess(false));
    dispatch(setIsUserInCabinet(false));
    let promise = dispatch(getMetro());
    let promise2 = dispatch(getHobbies(hobbyType));
    Promise.all([promise, promise2])
        .then(() => {
            dispatch(initializedMainPageSuccess(true));
        });
};
