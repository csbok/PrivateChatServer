'use strict';

var jwt = require('jsonwebtoken');
var config = require('../config/config.json');


// 로그인이 되어있는지 확인. 로그인이 안되어 있을경우 401 반환
exports.loginCheck = function(req, res, next) {
    jwt.verify(req.headers.authorization, config.jwtSecret, function(err, decoded) {
        if (err) {
            res.status(401).end();
            return;
        }

        req.jwt = decoded;
        return next();
    });
};

// 로그인이 되어있을 경우 jwt를 사용한다. 로그인이 없을경우에도 그냥 진행된다.
exports. getJwt = function(req, res, next) {
    jwt.verify(req.headers.authorization, config.jwtSecret, function(err, decoded) {
        if (err) {
            req.jwt = false;
        } else {
            req.jwt = decoded;
        }

        return next();
    });
};

