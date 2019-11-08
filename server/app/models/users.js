'use strict';
var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Users = new Schema({
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    date: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    role: { type: String, required: true, default: 'user' }
});

module.exports = mongoose.model('Users', Users);
