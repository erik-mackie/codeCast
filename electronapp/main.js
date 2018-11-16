const { app, BrowserWindow, shell, ipcMain, Menu } = require('electron');
const { StringDecoder } = require('string_decoder');
const url = require('url')
const isDev = require('electron-is-dev');
const path = require('path');
const fs = require ('fs');
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');

const decoder = new StringDecoder('utf8');

//require mapper function. Function call format: readDir(rootDirectory, done());
const { readDir, done } = require('./src/fileServices/fs-mapper.js');
// axios to send content to the server
const axios = require('./api');
const rootDir = path.join(__dirname, '..');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createMainWindow() {
	mainWindow = new BrowserWindow({
		backgroundColor: '#F7F7F7',
		minWidth: 1080,
		height: 800,
		width: 1080,
		show: false
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'public/build/index.html'),
		protocol: 'file:',
		slashes: true
	}));
   
	if (isDev) {
    const { 
			default: installExtension,
			REACT_DEVELOPER_TOOLS,
			REDUX_DEVTOOLS,
		} = require('electron-devtools-installer');
     
		installExtension(REACT_DEVELOPER_TOOLS)  
			.then(name => {
				console.log(`Added Extension: ${name}`);
			})
			.catch(err => {
				console.log('An error occurred: ', err);
			});

		installExtension(REDUX_DEVTOOLS)
			.then(name => {
				console.log(`Added Extension: ${name}`);
			})
			.catch(err => {
				console.log('An error occurred: ', err);
			});
	}

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		// mainWindow.webContents.openDevTools();
	});
}


let terminalWindow, watcher;
function createTerminalWindow() {
	terminalWindow = new BrowserWindow({
		backgroundColor: '#F7F7F7',
		minWidth: 800,
		height: 475,
		width: 800,
		show: false
	});

	terminalWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'public', 'indexTerminal.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Open the DevTools.
	terminalWindow.once('ready-to-show', () => {
		terminalWindow.show();
		// terminalWindow.webContents.openDevTools();
	});
	// Emitted when the window is closed.
	terminalWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		terminalWindow = null;
	});

}

generateMenu = () => {
  const template = [
    {
      label: 'File',
			submenu: [{ role: 'about' }, { role: 'quit' }]
		},
		{
			label: 'Edit',
			submenu: [
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' },
				{ role: 'pasteandmatchstyle' },
				{ role: 'delete' },
				{ role: 'selectall' }
			],
		},
		{
			label: 'View',
			submenu: [
				{ role: 'reload' },
				{ role: 'forcereload' },
				{ role: 'toggledevtools' },
				{ type: 'separator' },
				{ role: 'resetzoom' },
				{ role: 'zoomin' },
				{ role: 'zoomout' },
				{ type: 'separator' },
				{ role: 'togglefullscreen' }
			],
		},
		{
			role: 'window',
			submenu: [{ role: 'minimize' }, { role: 'close' }]
		},
		{
			role: 'help',
			submenu: [
				{
					click() {
						require('electron').shell.openExternal(
							'https://github.com/Benji-Leboe/codeCast'
						);
					},
					label: 'Learn More',
				},
				{
					click() {
						require('electron').shell.openExternal(
							'https://github.com/Benji-Leboe/codeCast/issues'
						);
					},
					label: 'File Issue on GitHub'
				},
			],
		},
	];
	Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.on('ready', () => {
	createMainWindow();
	generateMenu();
});


app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow();
	}
});

ipcMain.on('terminalOpen', (event, arg) => {
	console.log('terminalOpen in createWindow');
	createTerminalWindow();
});

let directory = null;
let content = null;
let filepaths = null;

async function getAllFiles() {
	fs.existsSync('./fileData/directory.json') ?
		null : (async () => {
			console.log('getAllFiles triggered');
			await readDir(rootDir, done(path.join(__dirname, 'fileData')));
		})();
	await postAllFiles();
}

async function postAllFiles() {
	if (fs.existsSync('./fileData/directory.json') && fs.existsSync('./fileData/content.json')) {
		console.log('postAllFiles triggered');
		directory = await decoder.write(fs.readFileSync('./fileData/directory.json'));
		content = await decoder.write(fs.readFileSync('./fileData/content.json'));
		filepaths = await decoder.write(fs.readFileSync('./fileData/content.json'));
	} else {
		setTimeout(() => {
			postAllFiles();
		}, 3000);
	}

	if (directory !== null && content !== null) {
		axios({
			method: 'post',
			url: '/api/electron',
			data: {
				directory: directory,
				content: content,
				filepaths: filepaths
			},
			error: (err) => {
				console.log('Axios error');
			}
		}).then((res) => {
			console.log('Post success');
		}).catch((err) => {
			console.error('Error');
			throw err;
		});
	}
}