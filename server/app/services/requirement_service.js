var model = require('../models');
var _ = require('underscore');

var service = {};
service.Create = Create;
service.getActive = getActive;
service.getAll = getAll;

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
module.exports = service;