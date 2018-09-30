import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ListSchools extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.schools.map(school => {
      return (
        <div key={school.id}>
          <Link to={`/schools/${school.id}`}>
            {''}
            {school.name}
          </Link>

          {'   ' +
            this.props.students.reduce((agg, student) => {
              if (student.schoolId * 1 === school.id * 1) {
                return agg + 1;
              } else {
                return agg;
              }
            }, 0)}
        </div>
      );
    });
  }
}
