var service = require('../../services');
var userController = {};
userController.GetUsers = GetUsers;
userController.UpdateUser = UpdateUser;
userController.DeleteUser = DeleteUser;
userController.GetCurrentUser = GetCurrentUser;
module.exports = userController;


function GetUsers(req, res) {
    if (req.query.id) {
        GetUserById(req, res);
    } else {
        service.user_service.GetUsers().then(result => {
            res.json(result);
        }, error => {
            res.json(error);
        });
    }
}

function GetUserById(req, res) {
    service.user_service.GetUserById(req.query.id).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}

function UpdateUser(req, res) {
    service.user_service.UpdateUser(req.query.id, req.body).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    })
}

function DeleteUser(req, res) {
    service.user_service.DeleteUser(req.query.id).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}

function GetCurrentUser(req, res) {
    service.user_service.GetUserById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}





