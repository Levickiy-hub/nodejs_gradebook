'use strict';
var express = require('express');
var passport = require('passport');
var router = express.Router();
const db = require('../db/DB');
//const db = require('../db/DBConfig');


/* GET users listing. */
router.get('/', async function (req, res) {
    var user = req.session.passport.user;
    if (user.role == 'student') {
        var lessons = await db.GetLessonsBySubgroup(user.subgroup);
        console.log(lessons[0]);
        res.render('student/index', { lessons: lessons[0] });
    }
    else {
        res.redirect('/');
    }
});
router.post('/', async function (req, res) {
    var user = req.session.passport.user;
    if (user.role == 'student') {
        const { schedule, lessonid } = req.body;
        var les = await db.GetLessonsById(lessonid);
        var mag = await db.GetMagByStudent(user.id, schedule)
        res.render('student/index', { mag: mag, les: les });
    }
     else {
        res.redirect('/');
    }
});
module.exports = router;
