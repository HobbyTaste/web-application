"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var db = mongoose_1.default.connection;
var Schema = mongoose_1.default.Schema;
var hobbySchema = new Schema({
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
var Hobby = db.model('Hobby', hobbySchema);
exports.default = Hobby;
