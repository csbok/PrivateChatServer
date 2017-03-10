var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var crypto = require('crypto');

var models = require("../models");
var config = require("../config/config.json");

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll().then(function(users) {
    return res.status(200).json(users);
  });
});


router.post('/', function(req ,res) {
    var shasum = crypto.createHash('sha256');
    shasum.update(req.body.password);
    var pw_enc = shasum.digest('hex');

    models.User.count({where: {LoginId: req.body.loginId} }).then(function(c) {
        if (c > 0) {
            res.status(405).end();
            throw 'duplicate id';
        }
    }).then(function() {
        return models.User.create({LoginId: req.body.loginId, Password: pw_enc});
    }).then(function (user) {
        res.status(200).end();
    });
});


router.post('/login', function(req, res) {
    console.log('login : ' +req.body.password);

    var shasum = crypto.createHash('sha256');
    shasum.update(req.body.password);
    var pw_enc = shasum.digest('hex');

    models.User.findOne({ where: {LoginId: req.body.loginId, Password: pw_enc} }).then(function(user) {
        if (!user) {
            res.status(401).end();
            return;
        }

        jwt.sign({ version: 1, id: user.id, nickname: user.Nickname }, config.jwtSecret, { expiresIn: '1h' }, function(err, token) {
            console.log(token);
            res.status(200).json({userId:user.id, jwt:token});
        });
    });
});


module.exports = router;
