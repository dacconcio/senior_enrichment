import { connect } from 'react-redux';
import React, { Component } from 'react';
import { studentIdToSchool } from './MapStudentsToSchools.js';
import ListSchools from './ListSchools.js'

const mapStateToProps = state => {
  return {
    students: state.students,
    schools: state.schools,
    studentIdToSchool: studentIdToSchool(state)
  };
};

/*const mapDispatchToProps = dispatch => {*/
//return {
//deleteSchool: id => dispatch(deleteStudent(id))
//};
/*};*/

class SchoolPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.schools ? (
          <ListSchools
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
  null
)(SchoolPage);
