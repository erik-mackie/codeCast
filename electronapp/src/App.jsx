import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import IndexView from './ViewComponents/IndexView.jsx';

// import logo from './assets/logo.svg';

class App extends Component {
  
  
  render() {
    return (
      <div className="App">
        <IndexView />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
    //state mapping here    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
    //dispatch actions here
  };   
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


