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
const buildPath = path.join(rootPath, 'client/build');

let ActiveViewFile = `nothing`;

let fileCache = null;
let dirCache = null;

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));

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

app.get('/*', (req, res) => {
  res.statusCode(200).json({ express: 'successful connection to express' });
});

app.get('/api/filecontent', (req, res) => {
  let fileID = req.body;
  fileCache ? res.status(200).json(JSON.stringify(fileCache[fileID])) : res.status(204).send('File not found');
})

//recieve file dir/content from electron
app.post('/api/electron', (req, res) => {
  
  res.status(200).send('Post success');
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
        'server/directory_pushed': (type, payload) => {

          console.log('server/dir_push triggered', payload);
          redux.emit('action', { type, payload });
        },
        'server/file_change': (type, payload) => {
          console.log('server/file_change triggered', payload);
          
          ActiveViewFile = `
          var addPlaylist = function (name) {
            var newId = uid();
            var newPlaylist = { id: '1234',
                             name: 'Chris',
                             tracks: []
                           };
                           
            library.playlists[newId] = newPlaylist
            console.log(library)
          }
        `;
        //update the code viewer
        redux.emit('action', { type: 'FILE_UPDATE', payload: ActiveViewFile });
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

const terminalOutput = {};

const terminal = io
  .of('/terminal')
  .on('connection', (socket) => {
    const termClients = [];
    console.log(`Terminal Socket ${socket.id} connected`);
    termClients.push(socket.id);
    console.log(termClients);

    socket.on('data', (data) => {
      let now = Date.now();
      terminalOutput[now] = data;
      terminal.emit('terminal', terminalOutput[now]); // refactor to action when we store data
    });
  });

const testStreams = [
  {
    title: 'NodeNStuff',
    user: 'Spencer Mc-Whhite',
    description: 'asdasdasasdasdasdasfsdfadsfasffasdsadsafsdfadsfsdsadasdsafasdfadsfsadsadasdsadsada',
    scheduledDate: Date.now(),
    youtubeURL: 'www.youtube.com',
    languageImage: 'image'
  },
  {
    title: 'RubyNStuff',
    user: 'Spencer Mc-Whhite',
    description: 'asdasdasasdasdasdasfsdfadsfasffasdsadsafsdfadsfsdsadasdsafasdfadsfsadsadasdsadsada',
    scheduledDate: Date.now(),
    youtubeURL: 'www.youtube.com',
    languageImage: 'image'
  }
]

    socket.on('disconnect', () => {
      console.log(`Terminal socket ${socket.id} disconnected`)
      let clientIndex = termClients.findIndex(e => e === socket.id);
      termClients.splice(clientIndex, 1);
      console.log(termClients);
    });
});


const testDirectory = {
  "projectRoot": {
    "firstDir": {
      "test": "hashRef1",
      "file2": "hashRef2",
      "file3": "hashRef3",

      "firstSubDir": {
        "file1": "hashRef",
        "file2": "hashRef",
        "file3": "hashRef",

        "firstNestedSubDir": {
          "file1": "hashRef",
          "file2": "hashRef",
          "file3": "hashRef"
        },

        "secondNestedSubDir": {
          "file1": "hashRef",
          "file2": "hashRef",
          "file3": "hashRef"
        }
      },
      "secondSubDir": {
        "file1": "hashRef",
        "file2": "hashRef",
        "file3": "hashRef",

        "firstNestedSubDir": {
          "file1": "hashRef",
          "file2": "hashRef",
          "file3": "hashRef"
        }
      }
    },
    "secondDir": {
      "file1": "hashRef",
      "file2": "hashRef",
      "file3": "hashRef"
    },
    "thirdDir": {
      "file1": "hashRef",
      "file2": "hashRef",
      "file3": "hashRef"
    }
  }
};
// setTimeout(() => {
//   console.log('directory update =================');
//   redux.emit('action', { type: 'DIRECTORY_UPDATE', payload: testDirectory });
// }, 40000);

// setTimeout(() => {
//   console.log('file update =================');
//   redux.emit('action', { type: 'FILE_UPDATE', payload: ActiveViewFile });
// }, 40000);