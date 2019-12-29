import {Schema, connection as db, Document, Model} from 'mongoose';
import {escapeRegExp} from 'lodash';

const EMAIL_REG_EXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

export interface IHobby extends Document {
    label: string,
    phone?: string,
    email?: string,
    address?: string,
    metroStation?: string,
    metroId?: string,
    description: string,
    shortDescription: string,
    owner: string,
    subscribers: string[],
    imagesUrl: string,
}

const HobbySchema: Schema = new Schema({
    label: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        match: [/^\+\d{11}$/, 'Неверный формат номера телефона']
    },
    email: {
        type: String,
        trim: true,
        match: [EMAIL_REG_EXP, 'Неверный формат email'],
    },
    address: {
        type: String,
        trim: true,
    },
    metroStation: {
        type: String,
        lowercase: true,
        trim: true,
    },
    metroId: {
        type: Number,
    },
    description: {
        type: String,
    },
    shortDescription: {
        type: String,
        maxlength: [500, 'toLongDescription'],
    },
    imageUrl: {
        type: String,
    },
    owner: {
        type: String
    },
    subscribers: {
        type: Array,
        default: []
    },
});

/**
 * Поиск хобби по названию в БД
 * @param label
 */
HobbySchema.statics.findByLabel = function(label: string): Promise<IHobby> {
    return this.find({label: new RegExp(escapeRegExp(label), 'i')});
};

/**
 * Поиск названию хобби по id-метро
 * (берущимся отсюда: https://data.mos.ru/classifier/7704786030-stantsii-moskovskogo-metropolitena)
 * @param label
 * @param metroId
 */
HobbySchema.statics.findByLabelWithGeo = function(label: string, metroId: number): Promise<IHobby> {
    return this.find({
        label: new RegExp(escapeRegExp(label), 'i'),
        metroId: metroId,
    });
};

interface IHobbyModel extends Model<IHobby> {
    findByLabel: (label: string) => Promise<IHobby[]>,
    findByLabelWithGeo: (label: string, metroId: number) => Promise<IHobby>
}
const obj: any = {};
const {}: IHobbyModel = obj;

const Hobby: IHobbyModel = db.model<IHobby, IHobbyModel>('Hobby', HobbySchema);
export default Hobby;
