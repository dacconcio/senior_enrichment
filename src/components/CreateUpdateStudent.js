import React, { Component } from 'react';
import { createStudent, updateStudent } from '../store.js';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    createStudent: student => dispatch(createStudent(student)),
    updateStudent: (student, id) => dispatch(updateStudent(student, id))
  };
};

const mapStateToProps = (state, props) => {
  let student = {};

  if (props.match.params.studentId) {
    student = state.students.find(student => {
      return student.id === props.match.params.studentId * 1;
    });
  }
  return {
    schools: state.schools,
    student
  };
};

class CreateUpdateStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      schoolId: '',
      loaded: false,
      loadedSchool: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const { firstName, lastName, gpa, schoolId } = this.state;
    let submitUpdate = false;

    if (this.props.match.params.studentId) {
      submitUpdate = true;
    }

    if (submitUpdate) {
      this.props.updateStudent(
        {
          firstName,
          lastName,
          gpa,
          schoolId: schoolId === '' ? null : schoolId
        },
        this.props.student.id
      );
    } else {
      this.props.createStudent({
        firstName,
        lastName,
        gpa,
        schoolId: schoolId === '' ? null : schoolId
      });
    }

    this.props.history.push('/students');
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.studentId &&
      prevProps.student !== this.props.student &&
      this.state.loaded === false
    ) {
      this.setState({
        firstName: this.props.student.firstName,
        lastName: this.props.student.lastName,
        gpa: this.props.student.gpa
      });

      this.setState({ loaded: true });
    }

    if (this.state.loadedSchool === false && this.props.match.params.schoolId) {
      this.setState({
        schoolId: this.props.match.params.schoolId,
        loadedSchool: true
      });
    }
  }
  componentDidMount() {
    if (
      this.props.match.params.studentId &&
      this.props.student &&
      this.state.loaded === false
    ) {
      this.setState({
        firstName: this.props.student.firstName,
        lastName: this.props.student.lastName,
        gpa: this.props.student.gpa
      });

      this.setState({ loaded: true });
    }

    if (this.state.loadedSchool === false && this.props.match.params.schoolId) {
      this.setState({
        schoolId: this.props.match.params.schoolId,
        loadedSchool: true
      });
    }
  }

  render() {
    const { firstName, lastName, gpa } = this.state;
    const { onChange, onSubmit } = this;

    let school = null;
    if (this.state.schoolId) {
      school = this.props.schools.find(
        school => school.id === this.props.match.params.schoolId * 1
      );
    }

    return (
      <div>
        <form className="form-group" onSubmit={onSubmit}>
          <div style={{ fontSize: 30 }}>First Name:</div>
          <input
            className="form-control"
            type="text"
            name="firstName"
            onChange={onChange}
            value={firstName}
          />{' '}
          <br />
          <div style={{ fontSize: 30 }}>Last Name:</div>
          <input
            className="form-control"
            type=""
            name="lastName"
            onChange={onChange}
            value={lastName}
          />{' '}
          <br />
          <div style={{ fontSize: 30 }}>GPA:</div>
          <input
            className="form-control"
            type=""
            name="gpa"
            onChange={onChange}
            value={gpa}
          />{' '}
          <br />
          <div style={{ fontSize: 30 }}>School:</div>
          {school ? (
            <div style={{ fontSize: 30 }}> {school.name} </div>
          ) : (
            <div>
              <select name="schoolId" onChange={onChange}>
                <option value="" name="school">
                  {' '}
                </option>
                {this.props.schools.map(school => {
                  return (
                    <option key={school.id} name="schoolId" value={school.id}>
                      {school.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          <br />
          <input className="btn btn-primary" type="submit" value="SUBMIT" />
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUpdateStudent);
