import React, { Component } from 'react';
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import socket from 'socket.io-client';
import 'xterm/src/xterm.css';

class Console extends Component {
  constructor() {
    super();
    this.__term = null;
    this.terminal = null;
    this.setTermRef = (e) => {
      this.__term = e;
      this.terminal.open(this.__term);
      this.terminal.fit()
    }
  }

  componentWillMount() {
    Terminal.applyAddon(fit);
    this.terminal = new Terminal({scrollback: 99999999, cursorBlink: true});
  }

  componentDidMount() {
    const io = socket.connect('http://localhost:8080/terminal');
    io.on('terminal', (data) => {
      this.terminal.write(data);
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className='terminal-main'
          ref={this.setTermRef}>
        </div>
      </div>
    );
  };
}

export default Console;