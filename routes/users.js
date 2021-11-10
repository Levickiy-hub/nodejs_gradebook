'use strict';
var express = require('express');
var router = express.Router();
const db = require('../db/DB');
//const db = require('../db/DBConfig');


/* GET users listing. */
router.get('/', async function (req, res) {
    var courses = await db.GetCourses();
    if (!courses) {
        for (var k = 1; k < 5; k++) {
            db.CreateCourse(k);
        }
        db.CreateUser('slava', 'slava', 'slava', 'admin');
        for (var k = 1; k < 5; k++) {
            for (var i = 1; i < 11; i++) {
                db.CreateGroup(k, i, 1);
                db.CreateGroup(k, i, 2);
            }
        }
        res.send('CREATE');
    }
    else {
        res.send('no create');
    }
});

module.exports = router;
