import React, { Component } from 'react';
import {
  updateStudent,
  deleteSchool,
  updateSchool,
  createSchool
} from '../store.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
  return {
    createSchool: school => dispatch(createSchool(school)),
    updateSchool: (school, id) => dispatch(updateSchool(school, id)),
    deleteSchool: id => dispatch(deleteSchool(id)),
    updateStudent: (student, id) => dispatch(updateStudent(student, id))
  };
};

const mapStateToProps = (state, props) => {
  let school = {};

  if (props.match.params.schoolId) {
    school = state.schools.find(school => {
      return school.id === props.match.params.schoolId * 1;
    });
  }

  return {
    students: state.students,
    school,
    location: props.location
  };
};

class CreateUpdateSchool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      address: '',
      description: '',
      loaded: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteSchool = this.deleteSchool.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.school !== this.props.school &&
      this.props.school.name &&
      this.state.loaded === false
    ) {
      this.setState({
        name: this.props.school.name,
        address: this.props.school.address,
        description: this.props.school.description
      });
      this.setState({ loaded: true });
    }
  }

  componentDidMount() {
    if (this.props.school.name && this.state.loaded === false) {
      this.setState({
        name: this.props.school.name,
        address: this.props.school.address,
        description: this.props.school.description
      });
      this.setState({ loaded: true });
    }
  }

  deleteSchool(id) {
    this.props.deleteSchool(id);
    this.props.history.push('/schools');
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.props.match.params.schoolId) {
      this.props.updateSchool(
        {
          name: this.state.name,
          adddress: this.state.address,
          description: this.state.description
        },
        this.props.match.params.schoolId
      );
    } else {
      this.props.createSchool({
        name: this.state.name,
        adddress: this.state.address,
        description: this.state.description
      });
    }
    this.props.history.push('/schools');
  }

  render() {
    return (
      <div>
        <form className="form-group" onSubmit={this.onSubmit}>
          <div style={{ fontSize: 30 }}> Name: </div>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.state.name}
          />{' '}
          <br />
          <div style={{ fontSize: 30 }}> Address: </div>
          <input
            className="form-control"
            type=""
            name="address"
            onChange={this.onChange}
            value={this.state.address}
          />{' '}
          <br />
          <div style={{ fontSize: 30 }}> Description: </div>
          <input
            className="form-control"
            type=""
            name="description"
            onChange={this.onChange}
            value={this.state.description}
          />{' '}
          <br />
          <input className="btn btn-primary" type="submit" value="SUBMIT" />
        </form>
        {this.props.match.params.schoolId ? (
          <div>
            <input
              className="btn btn-danger"
              onClick={() =>
                this.deleteSchool(this.props.match.params.schoolId)
              }
              type="submit"
              value="DELETE SCHOOL"
            />
            <br />
            <br />
            <button className="btn btn-success">
              <Link
                style={{ color: 'white' }}
                to={`/createstudent/${this.props.match.params.schoolId}`}
              >
                {' '}
                ADD A STUDENT TO THIS SCHOOL
              </Link>
            </button>
            <br />
            <br />
            <div style={{ fontSize: 30 }}> Students: </div>
            {this.props.students.map(student => {
              if (student.schoolId === this.props.match.params.schoolId * 1) {
                return (
                  <div key={student.id} style={{ fontSize: 20 }}>
                    <br /> {student.firstName + '   '}
                    <input
                      className="btn btn-warning"
                      type="submit"
                      value="REMOVE STUDENT FROM THE SCHOOL"
                      onClick={() =>
                        this.props.updateStudent(
                          {
                            schoolId: null
                          },
                          student.id
                        )
                      }
                    />
                  </div>
                );
              }
            })}
            <div />
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUpdateSchool);
