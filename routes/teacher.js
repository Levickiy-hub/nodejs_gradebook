'use strict';
var express = require('express');
var router = express.Router();
const db = require('../db/DB');



/* GET users listing. */
router.get('/', async function (req, res) {
var user = req.session.passport.user;
    if (user.role == 'teacher') {
        var courses = await db.GetCourses();
        res.render('teacher/index', { courses: courses });
    }
    else
        res.redirect('/');
});
router.post('/', async function (req, res) {
    var user = req.session.passport.user;
    if (user.role == 'teacher') {
        const { course } = req.body;
        var courses = await db.GetCourses();
        var curs = await db.GetCourseById(course);
        var lessons = await db.GLBTC(course, user.id);
        res.render('teacher/index', { lessons: lessons[0], courses: courses, curs: curs });
    }
    else res.redirect('/');
});
router.post('/lesson', async function (req, res) {
    var user = req.session.passport.user;
    if (user.role == 'teacher') {
        const { lessonid, number, group } = req.body;
        req.session.lessonid = lessonid;
        req.session.number = number;
        req.session.group = group;
        var courses = await db.GetCourses();
        var students = await db.GetStudentByGroup(group);
        var mag = await db.GetMagByShedules(lessonid);
        console.log(mag);
        var num = parseInt(number);
        res.render('teacher/index', { courses: courses, mags: mag, number: num, students: students,schedule:lessonid });
    }
    else res.redirect('/');
});
router.post('/lessons', async function (req, res) {
    var user = req.session.passport.user;
    if (user.role == 'teacher') {
        var error = undefined;
        const { student, rating, number, schedule } = req.body;
        var num = parseInt(req.session.number);
        var num1 = parseInt(number);
        var mag = await db.GetMagByShedules(req.session.lessonid);
        if (num < num1) { error = 'error'; }
        else {
            mag.forEach(element => {
                if (element.number == num1 && element.student == student) {
                    error = 'error';
                }
            });
        }
        if (error != 'error') {
            await db.CreateMag(schedule, student, number, rating);
        }
        var courses = await db.GetCourses();
        var students = await db.GetStudentByGroup(req.session.group);
        //console.log(mag);
        res.render('teacher/index', { courses: courses, mags: mag, number: num, students: students, schedule: req.session.lessonid,error:error });
    }
    else res.redirect('/');
});
module.exports = router;
