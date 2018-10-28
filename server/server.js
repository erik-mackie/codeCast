//const ENV      = require ('dotenv');
const app        = require('express')();
const http       = require('http').Server(app);
const path       = require('path');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const PORT       = 8080;

const server = http.listen(PORT, () => console.log('App listening on ' + PORT));

const io = require('socket.io')(server);

const rootPath = path.join(__dirname, '..');
const buildPath = path.join(rootPath, 'client', 'build');
const devPath = path.join(rootPath, 'client', 'public', 'index.html');

let fileCache = null;
let dirCache = null;

app.use(bodyParser({ limit: '50mb' }));

app.use(morgan('dev', {
  skip: (req, res) => {
    return res.statusCode < 400;
  }, stream: process.stderr
}));
app.use(morgan('dev', {
  skip: (req, res) => {
    return res.statusCode >= 400;
  }, stream: process.stdout
}));

app.get('/api/filecontent', (req, res) => {
  let fileID = req.body;
  fileCache ? res.status(200).json(JSON.stringify(fileCache[fileID])) : res.status(204).send('File not found');
});

app.get('/api/scheduledStreams/', (req, res) => {
  const testStreams = {
    "asdass": {
      title: 'NodeNStuff',
      user: 'Spencer h-White',
      description: 'asdasdasasdasdasdasfsdfadsfasffasdsadsafsdfadsfsdsadasdsafasdfadsfsadsadasdsadsada',
      scheduledDate: Date.now(),
      youtubeURL: 'www.youtube.com',
      userID: 1,
      streamID: 'asdass',
      languageImage: 'image'
    },
    "asdfad": {
      title: 'RubyNStuff',
      user: 'Spencer Mc-Whhite',
      description: 'asdasdasasdasdasdasfsdfadsfasffasdsadsafsdfadsfsdsadasdsafasdfadsfsadsadasdsadsada',
      scheduledDate: Date.now(),
      youtubeURL: 'www.youtube.com',
      userID: 1,
      streamID: 'asdfad',
      languageImage: 'image'
    }
  };

console.log('Get success');
  res.status(200).json(testStreams);
});

//recieve file dir/content from electron
app.post('/api/electron', (req, res) => {

  try {
    fileCache = req.body.content;
    dirCache = req.body.directory;
    res.status(200).send('Post request success');
  }
  catch (e) {
    res.status(500).send('Post request failed');
    console.log('Post to server failed:', e);
    throw e;
  }

});

app.get('/*', (req, res) => {
  res.sendFile(devPath);
});

io.on('connection', (socket) => {

  const clients = [];
  console.log(`Socket ${socket.id} connected`);
  clients.push(socket.id);
  console.log(clients);

  socket.on('action', (action) => {

    const actions = {
      'server/new_connection': (type, payload) => {
        console.log('Server message:', payload);
        if (dirCache !== null) {
          sendDirTree(dirCache);
        }
      }
    }

    function defaultAction(type, payload) {
      console.log("Default action triggered");
      socket.broadcast.emit(type, payload);
    }

    console.log('Action received:', action);
    const { type, payload } = action;
    actions[type] ? actions[type](type, payload) : defaultAction(type, payload);

  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`)
    let clientIndex = clients.findIndex(e => e === socket.id);
    clients.splice(clientIndex, 1);
    console.log(clients);
  });

  socket.on('error', (err) => {
    console.log(err, `from ${socket.id}`);
  });
});



const redux = io
  .of('/redux')
  .on('connection', (socket) => {

    const clients = [];
    console.log(`Socket ${socket.id} connected`);
    clients.push(socket.id);
    console.log(clients);
   
    socket.on('action', (action) => {      

      const actions = {
        'server/message': (type, payload) => {
          console.log('server/message action triggered', payload);
          redux.emit('action', { type: 'NEW_MESSAGE', payload });
        },
        'server/directory_update': (type, payload) => {
          console.log('server/dir_update triggered', payload);
          redux.emit('action', { type: 'DIRECTORY_UPDATE', payload });
        },
        'server/file_change': (type, payload) => {

          //**TODO: TRIGGER PUSH TO DIR TREE ON FILE UPDATE**//
          console.log('server/file_change triggered', payload);
          newFileVersion = payload;

          //update the code viewer
          redux.emit('action', { type: 'FILE_UPDATE', payload: newFileVersion });
        }
      };
      function defaultReduxAction(type, payload) {
        console.log("Default redux action triggered");
        return null
      }
      const { type, payload } = action;
      actions[type] ? actions[type](type, payload) : defaultReduxAction(type, payload);

      socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`)
        let clientIndex = clients.findIndex(e => e === socket.id);
        clients.splice(clientIndex, 1);
        console.log(clients);
      });

      socket.on('error', (err) => {
        console.log(err, `from ${socket.id}`);
      });
    });
  });

const terminalRecord = {};

const terminal = io
  .of('/terminal')
  .on('connection', (socket) => {
    const termClients = [];
    console.log(`Terminal Socket ${socket.id} connected`);
    termClients.push(socket.id);
    console.log(termClients);

    socket.on('data', (data) => {
      let now = Date.now();
      terminalRecord[now] = data;
      terminal.emit('terminal', terminalRecord[now]); // refactor to action when we store data
    });
  


    socket.on('disconnect', () => {
      console.log(`Terminal socket ${socket.id} disconnected`)
      let clientIndex = termClients.findIndex(e => e === socket.id);
      termClients.splice(clientIndex, 1);
      console.log(termClients);
    });
  });



// setTimeout(() => {
//   console.log('directory update =================');
//   redux.emit('action', { type: 'DIRECTORY_UPDATE', payload: testDirectory });
// }, 40000);

// setTimeout(() => {
//   console.log('file update =================');
//   redux.emit('action', { type: 'FILE_UPDATE', payload: ActiveViewFile });
// }, 40000);