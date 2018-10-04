import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const CREATE_STUDENTS = 'CREATE_STUDENTS';
const CREATE_ONE_STUDENT = 'CREATE_ONE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

const DELETE_SCHOOL = 'DELETE_SCHOOL';
const CREATE_SCHOOLS = 'CREATE_SCHOOL';
const CREATE_ONE_SCHOOL = 'CREATE_ONE_SCHOOL';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL';

const deleteSchoolOnState = id => {
  return {
    type: DELETE_SCHOOL,
    id
  };
};

export const deleteSchool = id => {
  return dispatch => {
    axios
      .delete(`/api/schools/${id}`)
      .then(response => {
        dispatch(deleteSchoolOnState(response.data));
      })
      .catch(err => console.log(err));
  };
};

const updateSchoolOnState = school => {
  return {
    type: UPDATE_SCHOOL,
    school
  };
};

export const updateSchool = (school, id) => {
  return dispatch => {
    axios
      .put(`api/schools/${id}`, school)
      .then(response => dispatch(updateSchoolOnState(response.data)))
      .catch(err => console.log(err));
  };
};

const updateStudentOnState = student => {
  return {
    type: UPDATE_STUDENT,
    student
  };
};

export const updateStudent = (student, id) => {
  return dispatch => {
    axios
      .put(`/api/students/${id}`, student)
      .then(response => dispatch(updateStudentOnState(response.data)))
      .catch(err => console.log(err));
  };
};

const createSchoolOnState = school => {
  return {
    type: CREATE_ONE_SCHOOL,
    school
  };
};

export const createSchool = school => {
  return dispatch => {
    axios
      .post('/api/schools/', school)
      .then(response => dispatch(createSchoolOnState(response.data)))
      .catch(err => console.log(err));
  };
};

const createStudentOnState = student => {
  return {
    type: CREATE_ONE_STUDENT,
    student
  };
};

export const createStudent = student => {
  return dispatch => {
    axios
      .post('/api/students/', student)
      .then(response => dispatch(createStudentOnState(response.data)))
      .catch(err => console.log(err));
  };
};

export const deleteStudentFromState = id => {
  return {
    type: DELETE_STUDENT,
    id
  };
};

export const deleteStudent = id => {
  return dispatch => {
    return axios
      .delete(`/api/students/${id}`)
      .then(response => {
        dispatch(deleteStudentFromState(response.data));
      })
      .catch(err => console.log(err));
  };
};
export const addStudentsToState = students => {
  return {
    type: CREATE_STUDENTS,
    students
  };
};

export const addSchoolsToState = schools => {
  return {
    type: CREATE_SCHOOLS,
    schools
  };
};

export const getDataFromServer = () => {
  return dispatch => {
    return axios
      .get('/api/students')
      .then(students => {
        dispatch(addStudentsToState(students.data));
      })
      .then(() => {
        return axios.get('/api/schools');
      })
      .then(schools => {
        dispatch(addSchoolsToState(schools.data));
      })
      .catch(err => console.log(err));
  };
};

const initialState = {
  students: [],
  schools: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_SCHOOL:
      let newSchoolsDelete = state.schools.filter(
        school => school.id !== action.id
      );

      return Object.assign({}, state, { schools: newSchoolsDelete });

    case UPDATE_SCHOOL:
      let newSchoolsUpdate = state.schools.map(school => {
        if (school.id === action.school.id) {
          return action.school;
        } else {
          return school;
        }
      });

      return Object.assign({}, state, { schools: newSchoolsUpdate });

    case UPDATE_STUDENT:
      let newStudentsUpdate = state.students.map(student => {
        if (student.id === action.student.id) {
          return action.student;
        } else {
          return student;
        }
      });

      return Object.assign({}, state, { students: newStudentsUpdate });

    case CREATE_ONE_SCHOOL:
      let newSchoolsCreateOne = [...state.schools];
      newSchoolsCreateOne.push(action.school);
      return Object.assign({}, state, { schools: newSchoolsCreateOne });

    case CREATE_ONE_STUDENT:
      let newStudentsCreateOne = [...state.students];
      newStudentsCreateOne.push(action.student);

      return Object.assign({}, state, { students: newStudentsCreateOne });

    case DELETE_STUDENT:
      let newStudentsDelete = state.students.filter(
        student => student.id !== action.id
      );

      return Object.assign({}, state, { students: newStudentsDelete });

    case CREATE_STUDENTS:
      return Object.assign({}, state, { students: action.students });

    case CREATE_SCHOOLS:
      return Object.assign({}, state, { schools: action.schools });

    default:
      return state;
  }
};

export default createStore(reducer, applyMiddleware(thunk));
