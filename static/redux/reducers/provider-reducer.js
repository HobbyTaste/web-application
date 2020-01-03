import Provider from "../../api/Provider";

const SET_ORGANIZATION = 'SET-ORGANIZATION';
const SET_TELEPHONE = 'SET_TELEPHONE';
const SET_EMAIL = 'SET_EMAIL';
const SET_SITE = 'SET_SITE';
const SET_METRO = 'SET_METRO';
const SET_ADRESS = 'SET_ADRESS';
const SET_INFO = 'SET_INFO';
const SET_IMAGE_URL = 'SET_IMAGE_URL';
const RESET = 'RESET';
const SET_PROVIDER_DATA = 'SET_PROVIDER_DATA';

const providerApi = new Provider();

let initialState = {
    organization: '',
    telephone: '',
    card_email: '',
    site: '',
    metro: '',
    adress: '',
    card_info: '',
    file: '',
    imageUrl: '',

    id: '',
    name: '',
    password: '',
    email: '',
    avatar: '',
    phone: '',
    info: '',
    providerIsAuth: false
};

const ProviderCabinetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORGANIZATION:
            return {...state , organization: action.organization};
        case SET_TELEPHONE:
            return {...state , telephone: action.telephone};
        case SET_EMAIL:
            return {...state , card_email: action.email};
        case SET_SITE:
            return {...state , site: action.site};
        case SET_METRO:
            return {...state , metro: action.metro};
        case SET_ADRESS:
            return {...state , adress: action.adress};
        case SET_INFO:
            return {...state , card_info: action.info};
        case SET_IMAGE_URL: {
            return {...state, file: action.file, imageUrl: action.imageUrl};
        }
        case RESET: {
            return { ...state, organization: '', telephone: '', card_email: '',
                site: '', metro: '', adress: '', card_info: '', file: '', imageUrl: ''}
        }
        case SET_PROVIDER_DATA: {
            return {
                ...state, id: action.id,
                name: action.name,
                password: action.password,
                email: action.email,
                avatar: action.avatar,
                phone: action.phone,
                info: action.info,
                providerIsAuth: true
            }
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

export const setAuthProviderData = (id, name, password, email, avatar, phone, info, providerIsAuth) =>
    ({type: SET_PROVIDER_DATA, id, name, password, email, avatar, phone, info, providerIsAuth});

export const getAuthProviderData = () => (dispatch) => {
    return providerApi.getInfo()
        .then(response => {
            if(response.status === 200) {
                let {id, name, password, email, avatar, phone, info} = response;
                dispatch(setAuthProviderData(id, name, password, email, avatar, phone, info, true));
            }
        });
};

export const createNewProvider = (name, password, email, avatar, phone, info) => (dispatch) => {
    const providerData = {
        name: name, password: password, email: email, avatar: avatar, phone: phone, info:info
    };
    providerApi.create(providerData).then((response) => {
        debugger;
        if (response.status === 200) {
            dispatch(getAuthProviderData());
        }
        else {
            return response.json().then(console.log);
        }
    })
};

export default ProviderCabinetReducer;