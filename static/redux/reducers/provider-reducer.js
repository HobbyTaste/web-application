const SET_ORGANIZATION = 'SET-ORGANIZATION';
const SET_TELEPHONE = 'SET_TELEPHONE';
const SET_EMAIL = 'SET_EMAIL';
const SET_SITE = 'SET_SITE';
const SET_METRO = 'SET_METRO';
const SET_ADRESS = 'SET_ADRESS';
const SET_INFO = 'SET_INFO';
const SET_IMAGE_URL = 'SET_IMAGE_URL';
const RESET = 'RESET';

let initialState = {
    organization: '',
    telephone: '',
    email: '',
    site: '',
    metro: '',
    adress: '',
    info: '',
    file: '',
    imageUrl: ''
};

const ProviderCabinetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORGANIZATION:
            return {...state , organization: action.organization};
        case SET_TELEPHONE:
            return {...state , telephone: action.telephone};
        case SET_EMAIL:
            return {...state , email: action.email};
        case SET_SITE:
            return {...state , site: action.site};
        case SET_METRO:
            return {...state , metro: action.metro};
        case SET_ADRESS:
            return {...state , adress: action.adress};
        case SET_INFO:
            return {...state , info: action.info};
        case SET_IMAGE_URL: {
            return {...state, file: action.file, imageUrl: action.imageUrl};
        }
        case RESET: {
            return { ...state, organization: '', telephone: '', email: '',
                site: '', metro: '', adress: '', info: '', file: '', imageUrl: ''}
        }
        default:
            return state;
    }
};

export const setOrganization = (organization) => ({type: SET_ORGANIZATION, organization});
export const setTelephone = (telephone) => ({type: SET_TELEPHONE, telephone});
export const setEmail = (email) => ({type: SET_EMAIL, email});
export const setSite = (site) => ({type: SET_SITE, site});
export const setMetro = (metro) => ({type: SET_METRO, metro});
export const setAdress = (adress) => ({type: SET_ADRESS, adress});
export const setInfo = (info) => ({type: SET_INFO, info});
export const setImage = (file, imageUrl) => ({type: SET_IMAGE_URL, file, imageUrl});
export const reset = () => ({type: RESET});

export default ProviderCabinetReducer;