import {Schema, connection as db, Document} from 'mongoose';
import bcrypt from 'bcrypt';
import logger from '../utils/logger';

const EMAIL_REG_EXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const SALT_WORK_FACTOR = 10;

export interface IUser extends Document {
    name: string;
    password: string;
    email: string;
    avatar: string;
}

interface IUserModel extends IUser {
    checkPasswords(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [EMAIL_REG_EXP, 'Неверный формат email'],
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
        type: String,
    }
});


UserSchema.pre<IUser>('save', async function() {
  if (!this.isModified('password')) {
    return;
  }

  try {
    // генерируем соль
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    // получаем хэш пароля
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  } catch(err) {
    logger.error(err);
  }
});

UserSchema.methods.checkPasswords = async function (candidatePassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (e) {
        logger.error(e);
        return false;
    }
};

const User = db.model<IUserModel>('User', UserSchema);
export default User;
