import React, { Component } from 'react';
import { Button } from 'antd';
import { Input, Select } from 'antd';
import { connect } from 'react-redux';
import { putScheduledStream } from '../redux/ducks/streamsDuck.js'

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

const InputGroup = Input.Group;
const Option = Select.Option;

class StartScheduled extends Component {

  constructor() {
    super();
    this.state = {
      youtubeURL: 'Enter the URL for your youtube LiveStream here'
    };
  };

  YoutubeUrlInput = (event) => {
    this.setState({youtubeURL: event.target.value})
  }

  HandleSubmit = (event) => {
    event.preventDefault();
    //redirect to broadcast page

    this.props.startScheduledStream({
      ...this.props.stagedStream,
      status: 'active',
      youtubeURL: this.state.youtubeURL
    });
    // TODO: React route to Streaming view (chat?) or dashboard
    ipcRenderer.send('terminalOpen', true);
    console.log(this.state);
    
  }

  render() {  
    
    return (

      <main className="start-scheduled">
        <header className="header">
          <Button id="dashboard-btn" type="primary">Dashboard</Button>
          <div className="logoPlaceholder">p</div>
        </header>
        <div className="main-container">
          <div>
           <h1>{this.props.stagedStream.title}</h1>
           <p>{this.props.stagedStream.description}</p>
          </div>

          <div className="forms-container">
            <form onSubmit={this.HandleSubmit}>

                <div className="youtube-container">
                  <h3>YouTube URL:</h3>
                  <input type="text" placeholder='Enter the URL for your youtube LiveStream here' onChange={this.YoutubeUrlInput} />
                </div>
                <input type="submit" value="Go live!" />
            </form>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stagedStream: state.streams.stagedStream
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startScheduledStream: (stream) => dispatch(putScheduledStream(stream))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartScheduled);