import { connect } from 'react-redux';
import React, { Component } from 'react';
import { deleteStudent } from '../store.js';
import ListStudents from './ListStudents.js';

const mapStateToProps = state => {
  return {
    students: state.students,
    schools: state.schools
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
    const { students, schools, deleteStudent } = this.props;

    return (
      <div>
        {this.props.students ? (
          <ListStudents
            students={students}
            schools={schools}
            deleteStudent={deleteStudent}
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
