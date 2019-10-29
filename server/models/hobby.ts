import mongoose from 'mongoose';
import {string} from "prop-types";

const db = mongoose.connection;
const Schema = mongoose.Schema;

const hobbySchema = new Schema({
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^\+7\d{10}$/, 'Incorrect phone number']
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
    description: {
      type: String,
    },
    shortDescription: {
      type: String,
      maxlength: [500, 'toLongDescription'],
      minlength: [10, 'toShortDescription'],
    }
});

const Hobby = db.model('Hobby', hobbySchema);
export default Hobby;
