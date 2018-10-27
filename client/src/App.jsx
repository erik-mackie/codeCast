import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//components

import Chat from './StreamComponents/Chat/ChatMain.jsx';
import LiveCodeDisplay from './StreamComponents/FileDisplay/LiveCodeDisplay.jsx';
import Video from './StreamComponents/VideoStream/VideoStream.jsx';
import Terminal from './StreamComponents/Terminal/Terminal.jsx';
import FileDirectory from './StreamComponents/FileDirectory/FileDirectory.jsx';

// import ElectronDashboard from './BroadcastComponents/ElectronDashboard/ElectronDashboard.jsx';
// import StartScheduled from './BroadcastComponents/ElectronDashboard/StartScheduled.jsx';
// import logo from './assets/logo.svg';

class App extends Component {
  
  
  render() {
    return (
      <div className="App">

        <div className='electron'>
          <StartScheduled />
        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(App);


