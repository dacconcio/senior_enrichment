import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'


const mountStateToProps = state => {
  return {
    numberOfStudents: state.students.length,
    numberOfSchools: state.schools.length
  };
};

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Link to='/schools' >Schools: {this.props.numberOfSchools} </Link>
        <Link to='/students' > Students: {this.props.numberOfStudents}</Link>
      <p />
      </div>
    );
  }
}
export default connect(mountStateToProps)(Nav);
