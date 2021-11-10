const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    database: 'register',
    username: 'postgres',
    password: 'Admin12345',
    dialect: 'postgres',
    port: '5432'
    //logging: false
});
//sequelize.authenticate();
const User = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },  
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subgroup: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});
sequelize.sync().then()
    .catch(err => console.log(err));

const Group = sequelize.define("groups", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    course: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    subgroup: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});
sequelize.sync().then()
    .catch(err => console.log(err));

const Lesson = sequelize.define("lessons", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    curs: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});
sequelize.sync().then()
    .catch(err => console.log(err));
const Schedule = sequelize.define("schedules", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    subgroup: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    lesson: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    teacher: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
sequelize.sync().then()
    .catch(err => console.log(err));

const Course = sequelize.define("courses", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    course: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
sequelize.sync().then()
    .catch(err => console.log(err));
const Mag = sequelize.define("mag", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    schedule: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    student: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    number: {
        type: Sequelize.STRING,
        allowNull: true
    },//номер лаб работы
    rating: {
        type: Sequelize.INTEGER,
        allowNull: true
    }// оценка за лаб 
});
sequelize.sync().then()
    .catch(err => console.log(err));
Course.hasMany(Group, {
    foreignKey: 'course'
});
Course.hasMany(Lesson, {
    foreignKey: 'curs'
});
Group.hasMany(User, {
    foreignKey: 'subgroup'
});
//User.hasMany(Mag, {
//    foreignKey: 'student'
//});
Group.hasMany(Schedule, {
    foreignKey: 'subgroup'
});
//Schedule.hasOne(Mag, {
//    foreignKey: 'shedule'
//});
Lesson.hasOne(Schedule, {
    foreignKey: 'lesson'
});
User.hasMany(Schedule, {
    foreignKey: 'teacher'
});
module.exports = {
    sequelize, User, Group, Lesson, Schedule, Course, Mag
};