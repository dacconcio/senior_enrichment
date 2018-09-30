import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from './store.js';
import { getDataFromServer } from './store.js';
import { connect, Provider } from 'react-redux';
import StudentsPage from './components/StudentsPage.js';
import { Switch, Route, HashRouter } from 'react-router-dom';
import StudentDetailPage from './components/StudentDetailPage';
import Nav from './components/Nav.js';
import CreateUpdateStudent from './components/CreateUpdateStudent.js'
import SchoolsPage from './components/SchoolsPage.js'
import CreateUpdateSchool from './components/CreateUpdateSchool.js'



const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch(getDataFromServer())
  };
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
      <div>
        <HashRouter>

          <div>
          <Route path ='/' component={Nav} />
            <Switch>
              <Route exact path="/students/" component={StudentsPage} />
              <Route exact path="/students/:id" component={CreateUpdateStudent} />
            </Switch>


              
            <Switch>
            <Route exact path='/schools' component={SchoolsPage} />
            <Route exact path='/schools/:id' component={CreateUpdateSchool} />
          </Switch>
          
          <Route exact path="/createstudent/:schoolId" component={CreateUpdateStudent} />
            <Route exact path='/createschool/' component={CreateUpdateSchool} />
          </div>

        </HashRouter>
      </div>
    );
  }
}

const ConnectedApp = connect(
  null,
  mapDispatchToProps
)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,

  document.getElementById('root')
);
