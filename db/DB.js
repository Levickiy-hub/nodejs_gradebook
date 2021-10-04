const db = require('./DBConfig');
var bcrypt = require('bcrypt');
async function CreateUser(name, login, password, role, subgroup) {
    db.User.create({
        name: name,
        login: login,
        password: bcrypt.hashSync(password, 10),
        role: role,
        subgroup: subgroup
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
};
async function CreateCourse(course) {
    db.Course.create({
     course:course
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
};
async function CreateGroup(course, number, subgroup) {
    db.Group.create({
        course: course,
        number: number,
        subgroup: subgroup
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
};
async function CreateLesson(name, course, number) {
    db.Lesson.create({
        curs: course,
        name: name,
        number:number
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
};
async function CreateSchedule(subgroup, lesson, teacher) {
    db.Schedule.create({
        subgroup: subgroup,
        lesson: lesson,
        teacher: teacher
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
};
async function CreateMag(shedule, student, number,rating) {
    db.Mag.create({
        schedule: shedule,
        student:student,
        number:number,
        rating:rating
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
};
async function GetStudentByGroup(subgroup) {
    const users = await db.User.findAll({ where: { subgroup: subgroup }, raw: true });
    return users;
};
async function GetTeacher() {
    const users = await db.User.findAll({ where: { role: 'teacher' }, raw: true });
    return users;
};
async function GetStudent() {
    const users = await db.User.findAll({ where: { role: 'student' }, raw: true });
    return users;
};
async function GetGroups() {
    const groups = await db.Group.findAll();
    return groups;
};
async function GetUserByLogin(login) {
    const user = await db.User.findOne({ where: { login: login }, raw: true });
    return user;
};
async function GSTG() {
    const users = await db.sequelize.query(' select users.id,users.name,users.login,users.subgroup as gid, groups.course,groups.number, groups.subgroup from users inner join groups on groups.id = users.subgroup;');
    return users;
};
async function GetSchedule() {
    const Schedule = await db.sequelize.query('select Schedules.id, lessons.id as lId, LESSONS.NAME, groups.id as gId, groups.course, groups.number, groups.subgroup, users.id as uId, users.name as teacher from Schedules, LESSONS, groups, users where Schedules.lesson = lessons.id and groups.id = Schedules.subgroup and users.id = Schedules.teacher;');
    return Schedule;
};
async function GetLessons(){
    const lessons = await db.Lesson.findAll();
    return lessons;
};
async function GetLessonsByCourse(course) {
    const lessons = await db.Lesson.findAll({ where: { curs: course }, raw: true });
    return lessons;
};

async function GetLessonsByTeacher(teacher) {
    const lessons = await db.Schedule.findAll({ where: { teacher: teacher }, raw: true });
    return lessons;
};
async function GetCourses() {
    const courses = await db.Course.findAll();
    return courses;
};
async function GetCourseById(id) {
    const course = await db.Course.findOne({ where: {id:id}});
    return course;
};
async function GLBTC(curs, teacher) {
    const lessons = await db.sequelize.query("select Schedules.id,LESSONS.NAME,LESSONS.number as col,Schedules.lesson,groups.number,groups.subgroup, groups.id as group  from Schedules,LESSONS, groups where Schedules.teacher = '" + teacher + "' AND Schedules.lesson = lessons.id and  groups.id = Schedules.subgroup and lessons.curs ='" + curs + "';");
    return lessons;
};
async function GetLessonsBySubgroup(subgroup) {
    const lessons = await db.sequelize.query('select schedules.id as id, lessons.id as lessons,lessons.name,lessons.number from schedules inner join lessons on lessons.id = schedules.lesson where subgroup = ' + subgroup + ';');
    return lessons;
};
async function GetLessonsById(id) {
    const lessons = await db.Lesson.findOne({ where: {id:id}});
    return lessons;
};

async function GetMagByStudent(student, lesson) {
    const lessons = await db.Mag.findAll({ where: { student: student, schedule:lesson }, raw: true });
    return lessons;
};
async function GetMagByShedules(id) {
    const lessons = await db.Mag.findAll({ where: { schedule: id }, raw: true });
    return lessons;
};
async function UpdateTeacher(id,name,login) {
    await db.User.update({ name: name, login: login },{ where: { id: id } });

};
async function UpdateLesson(id, name, course,number) {
    await db.Lesson.update({ name: name, curse: course,number:number },{ where: { id: id } });
};
async function UpdateSchedule(id, subgroup, lesson, teacher) {
    await db.Schedule.update({
        subgroup: subgroup,
        lesson: lesson,
        teacher: teacher }, { where: { id: id } });

};
async function UpdateUser(id, name,login,subgroup) {
    await db.User.update({
        name: name,
        login: login,
        subgroup:subgroup
    }, { where: { id: id } });

};
    module.exports = {
        CreateUser, CreateCourse, CreateGroup, CreateLesson, CreateSchedule, CreateMag,
        GetStudentByGroup, GetUserByLogin, GetTeacher, GetStudent, GetSchedule, GetGroups,
        GetLessonsByCourse, GetLessonsByTeacher, GetLessons, GetCourses, GetCourseById,
        GetLessonsBySubgroup, GetMagByStudent, GetLessonsById, GLBTC, GSTG,
        GetMagByShedules,
        UpdateTeacher, UpdateLesson, UpdateSchedule, UpdateUser
        
    }