import { connect } from 'react-redux';
import React, { Component } from 'react';
import ListSchools from './ListSchools.js';
import { Route } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    students: state.students,
    schools: state.schools
  };
};
class SchoolPage extends Component {
  constructor(props) {
    super(props);
  }

  onComponentChange(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.forceUpdate();
    }
  }

  render() {
    const { students, schools, deleteStudent, location } = this.props;

    return (
      <div>
        {this.props.schools ? (
          <Route>
            <ListSchools
              students={students}
              schools={schools}
              deleteStudent={deleteStudent}
              location={location}
            />
          </Route>
        ) : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(SchoolPage);
