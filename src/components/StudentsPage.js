import { connect } from 'react-redux';
import React, { Component } from 'react';
import { deleteStudent } from '../store.js';
import ListStudents from './ListStudents.js';
import { studentIdToSchool } from './MapStudentsToSchools.js';



const mapStateToProps = state => {

  return {
    students: state.students,
    schools: state.schools,
    studentIdToSchool: studentIdToSchool(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteStudent: id => dispatch(deleteStudent(id))
  };
};

class StudentsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
      <div>
        {this.props.students ? (
          <ListStudents
            students={this.props.students}
            schools={this.props.schools}
            studentIdToSchool={this.props.studentIdToSchool}
            deleteStudent={this.props.deleteStudent}
          />
        ) : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsPage);
