const electron = require('electron');
const fs = require ('fs');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
//axios to send file content and directory to server

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const axios = require('./api');
//require mapper function. Function call format: readDir(rootDirectory, done());
const { readDir, done } = require('../server/fs-mapper');

//temp root targets project directory
//**TODO: get rootDir from shell command**
const rootDir = path.join(__dirname, '..');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

async function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  //run fs-mapper module and map dir on window open
  //**TODO: pass variables from shell script that echos PWD**
  fs.existsSync('./directory.json') ? null : await readDir(rootDir, done(__dirname));

  let directory = null;
  let content = null;

  if (fs.existsSync('./directory.json') && fs.existsSync('./content.json')) {
    directory = await decoder.write(fs.readFileSync('./directory.json'));
    content = await decoder.write(fs.readFileSync('./content.json'));
  }

  if (directory !== null && content !== null) {
    axios({
      method: 'post',
      url: '/api/electron',
      data: {
        directory: JSON.stringify(directory),
        content: JSON.stringify(content)
      }
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.error('Error:', err.data);
      throw err;
    });
  }
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
