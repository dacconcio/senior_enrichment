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
    return (
      <div>
        {this.props.schools ? (
          <Route>
            <ListSchools
              students={this.props.students}
              schools={this.props.schools}
              deleteStudent={this.props.deleteStudent}
              location={this.props.location}
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
