'use strict';
var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Requirement = new Schema({
    longitude: { type: String, required: true, unique: true },
    latitude: { type: String, required: true, unique: true },
    things: [{ name: String, quantity: Number }],
    date: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Requirement', Requirement);
