var service = require('../../services');
var authController = {};
authController.Register = Register;
authController.Login = Login;
module.exports = authController;

function Register(req, res) {
    service.user_service.CreateUser(req.body).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    })
};

function Login(req, res) {
    service.user_service.Authenticate(req.body.email, req.body.password).then(result => {
        if (result) {
            req.session.token = result.token;
            if (result.token) {
                // authentication successful
                res.send({ token: result.token });
            } else {
                // authentication failed
                res.status(401).send('Username or password is incorrect');
            }
        } else {
            res.status(401).send('Username or password is incorrect');
        }

    }, error => {
        res.json(error);
    })
}

