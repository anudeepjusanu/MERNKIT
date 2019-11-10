var model = require('../models');
var _ = require('underscore');

var service = {};
service.Create = Create;
service.getActive = getActive;
service.getAll = getAll;
service.makeInactive = makeInactive;
service.deleteReq = deleteReq;
service.updateReq = updateReq;

function Create(obj) {
    return new Promise((resolve, reject) => {
        model.Requirement.create(obj, function (err, info) {
            err ? reject(err) : resolve(info);
        });
    })
}

function getActive() {
    return new Promise((resolve, reject) => {
        model.Requirement.find({ 'active': true }, function (err, info) {
            err ? reject(err) : resolve(info);
        });
    })
}

function getAll() {
    return new Promise((resolve, reject) => {
        model.Requirement.find(function (err, info) {
            err ? reject(err) : resolve(info);
        });
    })
}

function makeInactive(id) {
    return new Promise((resolve, reject) => {
        model.Requirement.findOneAndUpdate({ _id: id }, { $set: { "active": false } }, { new: true }, (err, doc) => {
            err ? reject(err) : resolve(doc);
        });
    })
}

function deleteReq(id) {
    return new Promise((resolve, reject) => {
        model.Requirement.deleteOne({ _id: id }, (err, doc) => {
            err ? reject(err) : resolve(doc);
        });
    })
}

function updateReq(id, obj) {
    return new Promise((resolve, reject) => {
        model.Requirement.findOneAndUpdate({ _id: id, "things._id": obj._id }, { $set: { 'things.$.quantity': obj.quantity } }, { new: true }, (err, doc) => {
            err ? reject(err) : resolve(doc);
        });
    })
}
module.exports = service;