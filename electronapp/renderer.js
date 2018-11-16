const fit = require('xterm/lib/addons/fit/fit');
const os = require('os');
const pty = require('node-pty');
const Terminal = require('xterm').Terminal;
const socket = require('socket.io-client');
const directoryWatcher = require('./src/fileServices/directoryWatcher.js');
const path = require('path');
const io = socket.connect('https://arcane-thicket-82509.herokuapp.com/terminal');

// Initialize node-pty with an appropriate shell
const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',

  cwd: process.cwd(),
  env: process.env
});

// Initialize xterm.js and attach it to the DOM
Terminal.applyAddon(fit);
const xterm1 = new Terminal({ scrollback: 9999999 });

xterm1.open(document.getElementById('xterm1'));
xterm1.fit();

// Setup communication between xterm.js and node-pty
xterm1.on('data', (data) => {
  ptyProcess.write(data);
});

ptyProcess.on('data', function (data) {
  xterm1.write(data);
  io.emit('data', data)
});

directoryWatcher(path.join(__dirname, '..'));