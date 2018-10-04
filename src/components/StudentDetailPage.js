import React, { Component } from 'react';
import { studentIdToSchool } from './MapStudentsToSchools.js';
import { connect } from 'react-redux';
import { getDataFromServer } from '../store.js';
import { deleteStudent } from '../store.js';

const mapStateToProps = (state, props) => {
  const student = state.students.find(student => {
    return student.id === props.match.params.id * 1;
  });

  let school = {};

  const studentIdToSchoolObj = studentIdToSchool(state);
  if (studentIdToSchoolObj[props.match.params.id * 1]) {
    school = studentIdToSchoolObj[props.match.params.id * 1];
  } else {
    school = {
      name: 'No School!'
    };
  }
  return {
    studentIdToSchool: studentIdToSchool(state),
    student,
    school
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch(getDataFromServer()),
    deleteStudent: id => dispatch(deleteStudent(id))
  };
};

class StudentDetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.props.getData();
  }

  componentDidUpdate() {
    if (
      this.props.student &&
      this.props.school &&
      this.state.loaded === false
    ) {
      this.setState({ loaded: true });
    }
  }

  render() {
    const { firstName, lastName, gpa } = this.props.student;

    return (
      <div>
        {this.state.loaded && this.props.student ? (
          <ul>
            <li> First Name: {firstName} </li>
            <li> Last Name {lastName} </li>
            <li> GPA: {gpa} </li>
            <li> School Name: {this.props.school.name} </li>
            <button
              className="btn btn-danger"
              onClick={() => this.props.deleteStudent(this.props.student.id)}
            >
              {' '}
              DELETE{' '}
            </button>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDetailPage);
