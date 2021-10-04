'use strict';
var express = require('express');
const session = require('express-session');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index/login');
});

router.post('/', passport.authenticate('local', { failureRedirect: '/' }),
    function (req, res) {
        var sessions = req.session;
        console.log(sessions);
        if (sessions.passport.user.role == 'teacher') {
            res.redirect('/teacher');
        }
        if (sessions.passport.user.role == 'student') {
            res.redirect('/student');
        }
        if (sessions.passport.user.role == 'admin') {
            res.redirect('/admin');
        }
});
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
module.exports = router;
