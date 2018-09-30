    const studentIdToSchoolObj = studentIdToSchool(state);
    if (studentIdToSchoolObj[props.match.params.id * 1]) {
      school = studentIdToSchoolObj[props.match.params.id * 1];
    } else {
      school = {
        name: 'No School!'
      };
    }
  }
