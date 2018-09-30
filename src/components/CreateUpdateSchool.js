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

  if (props.match.params.id) {
    school = state.schools.find(school => {
      return school.id === props.match.params.id * 1;
    });
  }
  return {
    students: state.students,
    school
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
  }

  componentDidMount() {
    if (
      this.props.match.params.id &&
      this.props.school &&
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

  componentDidUpdate() {
    if (
      this.props.match.params.id &&
      this.props.school &&
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

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.props.match.params.id) {
      this.props.updateSchool(
        {
          name: this.state.name,
          adddress: this.state.address,
          description: this.state.description
        },
        this.props.match.params.id
      );
    } else {
      this.props.createSchool({
        name: this.state.name,
        adddress: this.state.address,
        description: this.state.description
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          Name:{' '}
          <input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.state.name}
          />{' '}
          <br />
          Address:{' '}
          <input
            type=""
            name="address"
            onChange={this.onChange}
            value={this.state.address}
          />{' '}
          <br />
          Description:{' '}
          <input
            type=""
            name="description"
            onChange={this.onChange}
            value={this.state.description}
          />{' '}
          <br />
          <input type="submit" value="Submit" />
        </form>

        {this.props.match.params.id ? (
          <div>
            <input
              onClick={() =>
                this.props.deleteSchool(this.props.match.params.id)
              }
              type="submit"
              value="DELETE SCHOOL"
            />
            <br />
            <br />
            Students:{' '}
            {this.props.students.map(student => {
              if (student.schoolId === this.props.match.params.id * 1) {
                return (
                  <div key={student.id}>
                    {' '}
                    {student.firstName}
                    <input
                      type="submit"
                      value="REMOVE SCHOOL"
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
            <div>
              <br />
              <Link to={`/createstudent/${this.props.match.params.id}`}>
                {' '}
                Add a Student to this School
              </Link>
            </div>
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
