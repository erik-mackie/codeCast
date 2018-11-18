import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

//components
import Index from './ViewComponents/IndexViews/IndexViews.jsx';

//testing purposes only
// import Register from './ViewComponents/UserComponents/RegisterPage.jsx';

// import logo from './assets/logo.svg';
class App extends Component {   
  render() {
    return (
      <div className="App">
        {/* <Register /> */}
        <Route path="/" component={ Index } />
      </div>
    );
  }
}

export default withRouter(App);


