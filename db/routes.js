module.exports = function(app) {
  const {School, Student} = require('./models.js') 
  const Express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.use('/dist', Express.static(path.join(__dirname, '../dist')));

  app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });

  app.get('/api/students', (req, res, next) => {
    Student.findAll()
      .then(students => {
        res.send(students);
      })
      .catch(err => next(err));
  });

  app.get('/api/schools', (req, res, next) => {
    School.findAll()
      .then(school => res.send(school))
      .catch(err => next(err));
  });

  app.post('/api/schools', (req, res, next) => {
    School.create(req.body)
      .then(school =>{
        console.log('sending')
        res.send(school)})

      .catch(err => next(err));
  });

  app.put('/api/schools/:id', (req, res, next) => {
    School.findById(req.params.id)
      .then(school => school.update(req.body))
      .then(updatedSchool => res.send(updatedSchool))
      .catch(err => next(err));
  });

  app.put('/api/students/:id', (req, res, next) => {
    Student.findById(req.params.id)
      .then(student => student.update(req.body))
      .then(updatedStudent => res.send(updatedStudent))
      .catch(err => next(err));
  });

  app.delete('/api/students/:id', (req, res, next) => {
    Student.findById(req.params.id)
      .then(student => student.destroy())
      .then(() => res.send(req.params.id))
      .catch(err => next(err));
  });

  app.delete('/api/schools/:id', (req, res, next) => {
    School.findById(req.params.id)
      .then(school => school.destroy())
      .then(() => res.send(req.params.id))
      .catch(err => next(err));
  });

  app.post('/api/students/', (req, res, next) => {
    Student.create(req.body)
      .then(student => res.send(student))
      .catch(err => next(err));
  });
};
