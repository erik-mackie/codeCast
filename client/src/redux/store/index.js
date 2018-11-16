import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../_reducers/index.js';
import createSocketMW from 'redux-socket.io';
import socketIO from 'socket.io-client';
import thunk from 'redux-thunk';

const io = socketIO.connect('https://arcane-thicket-82509.herokuapp.com/redux');

const socketMW = createSocketMW(io, 'server/', { execute: executor });

function executor(action, emit, next, dispatch) {
  emit('action', action);
  next(action);
}

const middleware = [
  socketMW,
  thunk
];

const store = applyMiddleware(...middleware)(createStore)(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Testing
store.subscribe(() => {
  console.log('New state:', store.getState());
});

export default store;

//
