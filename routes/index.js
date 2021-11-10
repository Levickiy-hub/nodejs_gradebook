'use strict';
var express = require('express');
const session = require('express-session');
var passport = require('passport');
const db = require('../db/DB');
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
router.get('/updatepassword', function (req, res) {
    var sessions = req.session;
    if (sessions.passport.user.role == 'teacher' || sessions.passport.user.role == 'student' || sessions.passport.user.role == 'admin') {
        res.render('index/UpdatePassword');
    }
    else {
        res.redirect('/');
    }
});
router.post('/updatepassword', function (req, res) {
    var sessions = req.session;
    if (sessions.passport.user.role == 'teacher' || sessions.passport.user.role == 'student' || sessions.passport.user.role == 'admin') {
        const { password, password2 } = req.body;
        if (password == password2) {
            db.UpdatePassword(sessions.passport.user.id, password);
            res.render('index/UpdatePassword', { message: 'ok' });
        }
        else {
            res.render('index/UpdatePassword', { message: 'error' });
        }

    }
    else {
        res.redirect('/');
    }
});
module.exports = router;
