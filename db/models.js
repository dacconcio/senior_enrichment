const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL);

const Student = db.define('student', {
  firstName: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  lastName: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  gpa: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

const School = db.define('school', {
  name: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },

  address: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },

  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  }
});

Student.belongsTo(School);
School.hasMany(Student);

db.sync({ force: true })
  .then(() => {
    return School.create({
      name: 'Powder Mill',
      address: '123 Main St.',
      description: 'boring'
    });
  })
  .then(school => {
    const Dave = Student.create({
      firstName: 'Dave',
      lastName: 'A',
      gpa: 4,
      schoolId: school.id
    });

    const Jeff = Student.create({
      firstName: 'Jeff',
      lastName: 'Smith',
      gpa: 3
    });
  });

module.exports = {
  Student,
  School
};
