import { combineReducers } from 'redux'

import { fileReducer } from './file.reducer.js';
import { directoryReducer } from './directory.reducer.js';
import { chatReducer } from './chat.reducer.js';
import { streamsReducer } from './streams.reducer.js';

export const rootReducer = combineReducers({
  file: fileReducer,
  directory: directoryReducer,
  chat: chatReducer,
  streams: streamsReducer
})