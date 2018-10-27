const os = require('os');
const fs = require('fs');
const { StringDecoder } = require('string_decoder');
const { exec }= require('child_process');
const pty = require('node-pty');
const Terminal = require('xterm').Terminal;
const socket = require('socket.io-client');
const path = require('path');

// const decoder = new StringDecoder('utf8');

// const fifoPath = path.join(__dirname, 'pipe');

// function makeFIFO() {
//   console.log('makeFIFO triggered');
//   exec(`mkfifo ${fifoPath}`, (err, stdout, stderr) => {
//     if (err) console.log('mkfifo',err);
//     fs.chmod(fifoPath, 777, (err) => {if (err) throw err});
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
//   });
// }

// makeFIFO()
// // fs.access(fifoPath, (err) => {
// //   console.log('fifoPath:', fifoPath);
// //   err ? console.log(err) : makeFIFO();
// // })

// const fifoIn = fs.createReadStream(fifoPath);
// const fifoOut = fs.createWriteStream(fifoPath);


var io = socket.connect('http://localhost:8080/terminal');

// Initialize node-pty with an appropriate shell
const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.cwd(),
  env: process.env
});

// Initialize xterm.js and attach it to the DOM
const xterm1 = new Terminal({scrollback: 9999999});

xterm1.open(document.getElementById('xterm1'));


// Setup communication between xterm.js and node-pty
xterm1.on('data', (data) => {
  ptyProcess.write(data);
});


ptyProcess.on('data', function (data) {
  xterm1.write(data);
  
  io.emit('data', data);
});
