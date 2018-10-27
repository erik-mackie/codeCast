//const ENV = require ('dotenv');
const app = require('express')();
const http = require('http').Server(app);
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

const PORT = 8080;

const server = http.listen(PORT, () => console.log('App listening on ' + PORT));

const io = require('socket.io')(server);

const rootPath = path.join(__dirname, '..');
const buildPath = path.join(rootPath, 'client/build');

let ActiveViewFile = `nothing`;


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
  res.statusCode(200).json({ express: 'successful connection to express' })
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
          redux.emit('action', { type, payload });
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

const terminal = io
  .of('/terminal')
  .on('connection', (socket) => {
    const termClients = [];
    console.log(`Terminal Socket ${socket.id} connected`);
    termClients.push(socket.id);
    console.log(termClients);

    socket.on('data', (data) => {
      console.log('terminal data:', data);
      terminal.emit('terminal', data); // refactor to action when we store data
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