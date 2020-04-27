import * as actionTypes from '../actions/actionsTypes';
import photo from '../../components/HobbyCard/Image/photo.png';


let initialState = {
    initializedPage: false,
    id: 1,
    photos: ['https://czech-rurepublic-gb.ru/wp-content/uploads/2015/12/143635088818.jpg', 'https://w-dog.ru/wallpapers/0/0/437992000662990/kamera-fotoapparat-contax-devushka-fotograf.jpg', photo],
    label: 'Вид хобби',
    metro: 'станция метро',
    timeTable: 'расписание',
    equipment: '',
    address: 'Город улица дом всё такое',
    comfortable: '',
    specialConditions: '',
    description: 'Какое-то описание',
    price: 'цена',
    flag: {
        isParking: false,
        isBeginner: false,
        isRent: false,
    },
    contact: {
        mobile: '',
        website: '',
    },
    category: '',
    /*комменарии и ответы изначально пустые, это для примера*/
    comments: [{
        idComment: 1,
        userId: 1,
        text: 'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
        nameWriter: 'Азалия',
        date: '28.12.2020',
        stars: 2,
        answer: {
            providerId: 1,
            text: 'Спасибо за ваш отзыв! ',
            nameWriter: 'Имя парнера',
            date: '15.04.2020',
        }
    },
        {
            idComment: 2,
            userId: 2,
            text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
            nameWriter: 'Имя',
            date: '28.12.2020',
            stars: 3,
            answer: null,
        },
        {
            idComment: 3,
            userId: 2,
            text:'Текст отзыва. Много много текста мМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текстаМного много текста',
            nameWriter: 'Имя',
            date: '28.12.2020',
            stars: 5,
            answer: { providerId: 2,
                text: 'Спасибо за ваш отзыв! бла бла бла',
                nameWriter: 'Имя парнера2',
                date: '16.04.2020'
            }
        }],
};
const hobbyPageReducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.INITIALIZE_HOBBY_PAGE:
        return {
            ...state,
            initializedPage: action.initialized,
        };
    case actionTypes.ADD_RESPONSE:
        return {
            ...state,
          comments: [
                ...state.comments, action.comment
            ]
        };

    case actionTypes.SET_HOBBY_DATA:
        return {
            ...state,
            label: action.payload.label,
            metro: action.payload.metro,
            timeTable: action.payload.timeTable,
            equipment: action.payload.equipment,
            address: action.payload.address,
            comfortable: action.payload.comfortable,
            specialConditions: action.payload.specialConditions,
            description: action.payload.description,
            price: action.payload.price,
            flag: action.payload.flag,
            contact: action.payload.contact,
            category: action.payload.category,
        };
    default:
        return state;
    }
};


export default hobbyPageReducer;


