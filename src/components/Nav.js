import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mountStateToProps = state => {
  return {
    numberOfStudents: state.students.length,
    numberOfSchools: state.schools.length
  };
};

function Nav(props) {
  return (
    <ul style={{ fontSize: 30 }} className="nav nav-pills nav-justified">
      <li className="nav-item">
        <Link to="/schools">Schools: {props.numberOfSchools} </Link>
      </li>
      <li className="nav-item">
        <Link to="/students"> Students: {props.numberOfStudents}</Link>
      </li>
      <li className="nav-item">
        <Link to="/createstudent"> Create Student</Link>
      </li>
      <li className="nav-item">
        <Link to="/createschool"> Create School</Link>
      </li>

      <p />
    </ul>
  );
}

export default connect(mountStateToProps)(Nav);
