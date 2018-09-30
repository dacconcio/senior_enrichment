import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ListStudents extends Component {
  constructor(props) {
    super(props);
  }

  render() {    return (
      <div>
        {this.props.students.map(student => {
          const school = this.props.schools.find(school => {
            return school.id * 1 === student.schoolId * 1;
          });

          console.log(school);

          return (
            <div key={student.id}>
              <Link to={`/students/${student.id}`}>
                {''}
                {student.firstName}
              </Link>
              &ensp;
              {school ? school.name : null}
              &ensp;
              <div
                onClick={() => this.props.deleteStudent(student.id)}
                style={{ display: 'inline' }}
              >
                {'    '} DELETE
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
