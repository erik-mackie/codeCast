import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//components

import Chat from './StreamComponents/Chat/ChatMain.jsx';
import LiveCodeDisplay from './StreamComponents/FileDisplay/LiveCodeDisplay.jsx';
import Video from './StreamComponents/VideoStream/VideoStream.jsx';
import Terminal from './StreamComponents/Terminal/Terminal.jsx';
import FileDirectory from './StreamComponents/FileDirectory/FileDirectory.jsx';
// import ScheduleNewStream from './BroadcastComponents/ElectronDashboard/StartScheduled.jsx';

import ElectronDashboard from './BroadcastComponents/ElectronDashboard/ElectronDashboard.jsx';
import ScheduleNewStream from './BroadcastComponents/ElectronDashboard/ScheduleNewStream.jsx';
// import logo from './assets/logo.svg';

class App extends Component {
  
  
  render() {
    return (
      <div className="App">

        <div className='electron'>
          <ElectronDashboard />
        </div>


        {/* <div className='component-container1'>
          <div className="Filetree-display">
            <FileDirectory />
          </div>
          <div className="Video-display">
            <Video />
          </div>
          <div className="Chat-display">
            <Chat />
          </div>
        </div>  

        <div className="component-container2">
          <div className="Code-display">
            <LiveCodeDisplay />
          </div>
          <div className="Terminal-display">
            <Terminal />
          </div>
        </div> */}


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


