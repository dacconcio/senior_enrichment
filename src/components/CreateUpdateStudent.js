import React, { Component } from 'react';
import { createStudent, updateStudent } from '../store.js';
import { connect } from 'react-redux';
import { studentIdToSchool } from './MapStudentsToSchools.js';

const mapDispatchToProps = dispatch => {
  return {
    createStudent: student => dispatch(createStudent(student)),
    updateStudent: (student, id) => dispatch(updateStudent(student, id))
  };
};

const mapStateToProps = (state, props) => {
  let student = {};

  if (props.match.params.id) {
    student = state.students.find(student => {
      return student.id === props.match.params.id * 1;
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


    let finalSchoolId = null;
    if (this.state.schoolId !== '') {
      finalSchoolId = this.state.schoolId;
    }

    if (this.props.match.params.id){


      console.log('update')


      this.props.updateStudent(
        {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          gpa: this.state.gpa,
          schoolId: finalSchoolId
        },
        this.props.student.id
      );
    } else {
      console.log(this.state)

      this.props.createStudent({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        gpa: this.state.gpa,
        schoolId: finalSchoolId
      });
    }
  }

  componentDidMount() {
    if (
      this.props.match.params.id &&
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
  


  if(this.state.loadedSchool === false && this.props.match.params.schoolId){
    this.setState({
      schoolId: this.props.match.params.schoolId, 
      loadedSchool: true
    })
  }
  }

  componentDidUpdate() {
    if (
      this.props.match.params.id &&
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


  if(this.state.loadedSchool === false && this.props.match.params.schoolId){
    this.setState({
      schoolId: this.props.match.params.schoolId, 
      loadedSchool: true
    })
  }
  }

 

  render() {
    let school = null;

    if (this.props.match.params.schoolId) {
      school = this.props.schools.find(
        school => school.id === this.props.match.params.schoolId * 1
      );
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          First Name:{' '}
          <input
            type="text"
            name="firstName"
            onChange={this.onChange}
            value={this.state.firstName}
          />{' '}
          <br />
          Last Name:{' '}
          <input
            type=""
            name="lastName"
            onChange={this.onChange}
            value={this.state.lastName}
          />{' '}
          <br />
          GPA:{' '}
          <input
            type=""
            name="gpa"
            onChange={this.onChange}
            value={this.state.gpa}
          />{' '}
          <br />
          School:{' '}
          {school ? (
            school.name
          ) : (
            <div>
              <select name="schoolId" onChange={this.onChange}>
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
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUpdateStudent);
