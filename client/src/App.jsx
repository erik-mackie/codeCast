import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//components

import Nav from './ViewComponents/Nav.jsx';
import Index from './ViewComponents/IndexViews/IndexViews.jsx';

// import logo from './assets/logo.svg';

class App extends Component {   
  render() {
    return (
      <div className="App">
        <Route component={ Nav } className="app-nav" />
        <Switch>
          <Route path="/" component={ Index } />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);


