import {Schema, connection as db, Document} from 'mongoose';
import bcrypt from 'bcrypt';
import logger from '../utils/logger';
import {string} from "prop-types";

const EMAIL_REG_EXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const PHONE_REG_EXP = /^\+\d{11}$/;
const SALT_WORK_FACTOR = 10;

export interface IProvider extends Document {
    name: string;
    password: string;
    email: string;
    avatar: string;
    phone: string;
    info: string;
}

interface IProviderModel extends IProvider {
    checkPasswords(candidatePassword: string): Promise<boolean>
}

const ProviderSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [PHONE_REG_EXP, 'Неверный формат']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [EMAIL_REG_EXP, 'Неверный формат email'],
    },
    info: {
        type: String,
        maxlength: 2000,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    }
});


ProviderSchema.pre<IProvider>('save', async function() {
    if (!this.isModified('password')) {
        return;
    }

    try {
        // генерируем соль
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        // получаем хэш пароля
        this.password = await bcrypt.hash(this.password, salt);
    } catch(err) {
        logger.error(err);
    }
});

ProviderSchema.methods.checkPasswords = async function (candidatePassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (e) {
        logger.error(e);
        return false;
    }
};

const Provider = db.model<IProviderModel>('Provider', ProviderSchema);
export default Provider;
