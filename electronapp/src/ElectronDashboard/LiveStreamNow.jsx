import React from 'react';
import { Button } from 'antd';
import { Input, Select } from 'antd';
import { connect } from 'react-redux';
import { postActiveStream } from '../redux/ducks/streamsDuck.js'

import { withRouter, Link } from 'react-router-dom';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class LiveStreamNow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'placeholder',
      user: 'Benji Liabø',
      userID: 1,
      description: '',
      scheduledDate: new Date(),
      youtubeURL: '',
      languageImage: ''
    };
  };

  //handlers
  HandleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  HandleImageSelection = (value) => {
    this.setState({languageImage: value});
    console.log(value)
  };

  HandleSubmit = (event) => {
    event.preventDefault();
    
    // TODO: check form validation before terminalOpen and form submit
    this.props.postActiveStream(this.state);
    ipcRenderer.send('terminalOpen', true);
    this.props.history.push('/');
    // TODO: show broadcasting view
  };

  render() {  
    return (
      <main className="new-stream">
        <div className="inputs-container">
          <h1 className="container-header">Start New Stream</h1>

          <div className="forms-container">

            <form onSubmit={this.HandleSubmit}>

              <div className="title-input">
                <h3>Title:</h3>
                <input type="text" name='title' onChange={this.HandleInputChange} />
              </div>
              <div className="description-input">
                <h3>Description:</h3>
                <textarea type="text" rows="4" cols="90" name='description' onChange={this.HandleInputChange} />
              </div>

              <div className=" bottom-container">

                <div className="youtube-container">
                  <h3>YouTube URL:</h3>
                  <input type="text" placeholder="https://www.youtube.com/channel/PLACEHOLDER" name='youtubeURL' onChange={this.HandleInputChange} />
                </div>
                <div className="b-bottom-container">
                  <input type="submit" value="Go live!" />
                </div>

              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postActiveStream: (stream) => dispatch(postActiveStream(stream))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(LiveStreamNow));
