require('./../config/config');

const express = require('express');
const router = express.Router();
const { ObjectID } = require('mongodb')
const _ = require('lodash');

var { User } = require('./../models/user');
var { authenticate } = require('./../middleware/authenticate');

router.post('/', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

router.get('/me', authenticate, (req, res) => {
    res.send(req.user);
})

router.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email'], ['password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);

        })
    }).catch((err) => {
        res.status(400).send();
    })
})

router.delete('/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    })
})

module.exports = router;