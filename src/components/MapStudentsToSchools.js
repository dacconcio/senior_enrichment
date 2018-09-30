export const studentIdToSchool = state => {
  let studentsThatGoToSchool = [];
  let studentToSchool = {};

  studentsThatGoToSchool = state.students.reduce((accum, student) => {
    if (student.schoolId) {
      accum.push(student.id);
    }
    return accum;
  }, []);

  studentToSchool = state.students.reduce((accum, student) => {
    if (studentsThatGoToSchool.includes(student.id)) {
      accum[student.id] = state.schools.find(
        school => school.id === student.schoolId
      );
    }
    return accum;
  }, {});

  return studentToSchool;
};
