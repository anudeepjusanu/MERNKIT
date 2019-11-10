var service = require('../../services');
var requirementController = {};
requirementController.Create = Create;
requirementController.GetActive = GetActive;
requirementController.GetAll = GetAll;


function GetActive(req, res) {
    service.requirement_service.getActive()
        .then(function (docs) {
            if (docs) {
                res.send(docs);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function GetAll(req, res) {
    service.requirement_service.getAll()
        .then(function (docs) {
            if (docs) {
                res.send(docs);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function Create(req, res) {
    service.requirement_service.Create(req.body)
        .then(function (obj) {
            if (obj) {
                res.send(obj);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

module.exports = requirementController;