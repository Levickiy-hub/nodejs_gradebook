'use strict';
var express = require('express');
var router = express.Router();
const db = require('../db/DB');
//const db = require('../db/DBConfig');


/* GET users listing. */
router.get('/', async function (req, res) {
    var user = req.session.passport.user;
    if (user.role == 'admin') {
        res.render('admin/index');
    }
    else {
        res.redirect('/');
    }
});
router.get('/teacher', async function (req, res) {
    var user = req.session.passport.user;
    if (user.role == 'admin') {
        var teachers = await db.GetTeacher();
        res.render('admin/teacher', { teachers: teachers });
    }
    else {
        res.redirect('/');
    }
});
router.post('/teacher', async function (req, res) {
    var user = req.session.passport.user;
    if (user.role == 'admin') {
        const { parm, id, name,login } = req.body;
        if (parm == 'add') {
            db.CreateUser(name, login, '1234', 'teacher');
        }
        else if (parm == 'update') {
            db.UpdateTeacher(id, name, login);
        }
        res.redirect('/admin/teacher');
    }
    else {
        res.redirect('/');
    }
});
router.get('/lesson', async function (req, res) {
    var user = req.session.passport.user;
    if (user.role == 'admin') {
        var lessons = await db.GetLessons();
        console.log(lessons);
        res.render('admin/lesson', {lessons:lessons});
    }
    else {
        res.redirect('/');
    }
});
router.post('/lesson', async function (req, res) {
    var user = req.session.passport.user;
    if (user.role == 'admin') {
        const { parm, id, name, cours,number } = req.body;
        if (parm == 'add') {
            db.CreateLesson(name, cours,number);
        }
        else if (parm == 'update') {
            db.UpdateLesson(id, name, cours,number);
        }
        res.redirect('/admin/lesson');
    }
    else {
        res.redirect('/');
    }
});

router.get('/schedule', async function (req, res) {
    var user = req.session.passport.user;
    if (user.role == 'admin') {
        var Schedule = await db.GetSchedule();
        var courses = await db.GetCourses();
        var teachers = await db.GetTeacher();
        var lessons = await db.GetLessons();
        var groups = await db.GetGroups();
       // console.log(Schedule);
        console.log(groups);
        res.render('admin/schedule', { schedule: Schedule[0], teachers: teachers, courses: courses, lessons: lessons, groups: groups });
    }
    else {
        res.redirect('/');
    }
});
router.post('/schedule', async function (req, res) {
    var user = req.session.passport.user;
    if (user.role == 'admin') {
        const { parm, id, lesson, group, teacher } = req.body;
        if (parm == 'add') {
            db.CreateSchedule(group, lesson, teacher);
        }
        else if (parm == 'update') {
              db.UpdateSchedule(id, group, lesson, teacher);
        }
        res.redirect('/admin/schedule');
    }
    else {
        res.redirect('/');
    }
});
router.get('/student', async function (req, res) {
    var user = req.session.passport.user;
    if (user.role == 'admin') {
        var students = await db.GSTG();
        var groups = await db.GetGroups();
        res.render('admin/student', { students: students[0], groups:groups });
    }
    else {
        res.redirect('/');
    }
});
router.post('/student', async function (req, res) {
    var user = req.session.passport.user;
    if (user.role == 'admin') {
        const { parm, id, name,group, login } = req.body;
        if (parm == 'add') {
            db.CreateUser(name, login, '1234', 'student', group);
        }
        else if (parm == 'update') {
            db.UpdateUser(id, name,login,group);
        }
        res.redirect('/admin/student');
    }
    else {
        res.redirect('/');
    }
});
module.exports = router;
