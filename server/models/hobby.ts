import {Schema, connection as db, Document, Model} from 'mongoose';
import {escapeRegExp} from 'lodash';
const EMAIL_REG_EXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

export interface IHobby {
    label: string,
    phone?: string,
    email?: string,
    address?: string,
    metroStation?: string,
    metroId?: string,
    description: string,
    shortDescription: string,
}

interface IHobbyDocument extends Document {}

const HobbySchema: Schema = new Schema({
    label: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        match: [/^\+7\d{10}$/, 'Неверный формат номера телефона']
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
        minlength: [10, 'toShortDescription'],
    }
});

/**
 * Поиск хобби по названию в БД
 * @param label
 */
HobbySchema.statics.findByLabel = function(label: string): Promise<IHobbyDocument> {
    return this.find({label: new RegExp(escapeRegExp(label), 'i')});
};

/**
 * Поиск названию хобби по id-метро
 * (берущимся отсюда: https://data.mos.ru/classifier/7704786030-stantsii-moskovskogo-metropolitena)
 * @param label
 * @param metroId
 */
HobbySchema.statics.findByLabelWithGeo = function(label: string, metroId: number): Promise<IHobbyDocument> {
    return this.find({
        label: new RegExp(escapeRegExp(label), 'i'),
        metroId: metroId,
    })
};

interface IHobbyModel extends Model<IHobbyDocument> {
    findByLabel: (label: string) => Promise<IHobbyDocument[]>,
    findByLabelWithGeo: (label: string, metroId: number) => Promise<IHobbyDocument>
}

const Hobby: IHobbyModel = db.model<IHobbyDocument, IHobbyModel>('Hobby', HobbySchema);
export default Hobby;
