
var model = require('../models');
var _ = require('underscore');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var { secret } = require('../../../config');

var service = {};
service.Authenticate = Authenticate;
service.GetUsers = GetUsers;
service.GetUserById = GetUserById;
service.CreateUser = CreateUser;
service.UpdateUser = UpdateUser;
service.DeleteUser = DeleteUser;
module.exports = service;


function Authenticate(email, password) {
    return new Promise((resolve, reject) => {
        model.Users.findOne({ email: email, "active": true }, function (err, user) {
            if (err) reject(err.name + ': ' + err.message);

            if (user && user.hash && password && bcrypt.compareSync(password, user.hash)) {
                // authentication successful
                resolve({ "token": jwt.sign({ sub: user._id }, secret) });
            } else {
                // authentication failed
                resolve();
            }
        });
    });
}

function GetUsers() {
    return new Promise((resolve, reject) => {
        model.Users.find((err, docs) => {
            err ? reject(err) : resolve(docs);
        });
    });
}


function GetUserById(id) {
    return new Promise((resolve, reject) => {
        model.Users.findById(id, (err, docs) => {
            if (err) {
                reject(err)
            } else {
                delete docs.hash;
                resolve(docs);
            }
        });
    });
}

function CreateUser(user) {
    var set = {
        ...user
    };
    set.hash = bcrypt.hashSync(user.password, 10);
    delete set.password;
    return new Promise((resolve, reject) => {
        model.Users.create(set, function (err, info) {
            err ? reject(err) : resolve(info);
        });
    })
}

function UpdateUser(id, user) {
    var set = {
        ...user
    };
    if (user.password) {
        set.hash = bcrypt.hashSync(user.password, 10);
        delete set.password;
    }
    return new Promise((resolve, reject) => {
        model.Users.findOneAndUpdate({ _id: id }, { $set: user }, { new: true }, (err, doc) => {
            err ? reject(err) : resolve(doc);
        });
    })
}

function DeleteUser(id) {
    return new Promise((resolve, reject) => {
        model.Users.findOneAndUpdate({ _id: id }, { $set: { "active": false } }, { new: true }, (err, doc) => {
            err ? reject(err) : resolve(doc);
        });
    });
}


