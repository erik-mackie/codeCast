import { combineReducers } from 'redux'

import { fileReducer } from './file.reducer.js';
import { directoryReducer } from './directory.reducer.js';
import { chatReducer } from './chat.reducer.js';
import { streamsReducer } from './streams.reducer.js';
import { alertReducer } from './alert.reducer.js';
import { authenticationReducer } from './authentication.reducer.js';
import { registrationReducer } from './registration.reducer.js';
import { usersReducer } from './users.reducer.js';


const rootReducer = combineReducers({
  file: fileReducer,
  directory: directoryReducer,
  chat: chatReducer,
  streams: streamsReducer,
  userAlert: alertReducer,
  authentication: authenticationReducer,
  registration: registrationReducer,
  users: usersReducer
});

export default rootReducer;

