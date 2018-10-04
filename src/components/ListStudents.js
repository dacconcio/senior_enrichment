import { Link } from 'react-router-dom';
import React from 'react';

export default function ListStudents(props) {
  return (
    <div className="list-group" style={{ fontSize: 20 }}>
      {props.students.map(student => {
        const school = props.schools.find(school => {
          return school.id === student.schoolId;
        });
        return (
          <div className="list-group-item" key={student.id}>
            <Link to={`/students/${student.id}`}>{student.firstName}</Link>
            &ensp;
            {school ? '(Goes to ' + school.name + ')' : null}
            &ensp;
            <button
              onClick={() => props.deleteStudent(student.id)}
              style={{ display: 'inline' }}
              className="btn btn-danger"
            >
              {'    '} DELETE
            </button>
          </div>
        );
      })}
    </div>
  );
}
