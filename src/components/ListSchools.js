import { Link } from 'react-router-dom';
import React from 'react';

export default function ListSchools(props) {
  return props.schools.map(school => {
    return (
      <div className="list-group" key={school.id} style={{ fontSize: 20 }}>
        <div className="list-group-item">
          <Link to={`/schools/${school.id}`}>
            {''}
            {school.name}
          </Link>
          {'   (' +
            props.students.reduce((agg, student) => {
              if (student.schoolId * 1 === school.id * 1) {
                return agg + 1;
              } else {
                return agg;
              }
            }, 0)}
          {'   '} Students)
        </div>
      </div>
    );
  });
}
