import { IProvider } from './../models/provider';
import { IHobby } from '../models/hobby';

export const wrong_hex_string = '123456788765432112345678';

export const provider: Partial<IProvider> = {
    name: 'Igor',
    password: '0000',
    email: 'provider@yandex.ru',
    phone: '+79123456789',
    info: 'cool provider'
};

export const provider_update: Partial<IProvider> = {
    name: 'Dmitry',
    password: '2222',
    phone: '+79112345678',
    info: 'updated cool provider'
}

export const another_provider: Partial<IProvider> = {
    name: 'Oleg',
    password: '1111',
    email: 'provider@gmail.com',
    phone: '+79012345678',
    info: 'hot provider'
};

export const hobbies: Partial<IHobby>[] = [
    {
        category: 'sport',
        phone: '+79777001313',
        email: 'first_sport@gmail.com',
        metroId: '1',
        label: '1s'
    },
    {
        category: 'sport',
        phone: '+79867241008',
        email: 'second_sport@gmail.com',
        metroId: '2',
        label: '2s'
    },
    {
        category: 'sport',
        phone: '+79404880918',
        email: 'third_sport@gmail.com',
        metroId: '3',
        label: '3s'
    },
    {
        category: 'music',
        phone: '+79436548923',
        email: 'first_music@gmail.com',
        metroId: '1',
        label: '1m'
    },
    {
        category: 'music',
        phone: '+79569437769',
        email: 'first_music@gmail.com',
        metroId: '2',
        label: '2m'
    },
    {
        category: 'travel',
        phone: '+79755963816',
        email: 'first_travel@gmail.com',
        metroId: '1',
        label: '1t'
    }
];

export const hobby_update = {
    phone: '+79702116147'
}

export const user = {
    name: 'Anatoly',
    password: '0000',
    email: 'user@yandex.ru'
}

export const another_user = {
    name: 'Vladimir',
    password: '1111',
    email: 'user@gmail.com'
}

export const user_update = {
    password: '2222',
    email: 'updated_user@yandex.ru'
}