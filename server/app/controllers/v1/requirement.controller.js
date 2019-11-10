var service = require('../../services');
var requirementController = {};
requirementController.Create = Create;
requirementController.GetActive = GetActive;
requirementController.GetAll = GetAll;
requirementController.MakeInactive = MakeInactive;
requirementController.DeleteRequirement = DeleteRequirement;
requirementController.Update = Update;


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

function MakeInactive(req, res) {
    service.requirement_service.makeInactive(req.query.id)
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

function DeleteRequirement(req, res) {
    service.requirement_service.deleteReq(req.query.id)
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

function Update(req, res) {
    service.requirement_service.updateReq(req.query.id, req.body)
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

module.exports = requirementController;