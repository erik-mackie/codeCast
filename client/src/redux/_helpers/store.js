import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers/index.js';
import createSocketMW from 'redux-socket.io';
import socketIO from 'socket.io-client';

const io = socketIO.connect('https://arcane-thicket-82509.herokuapp.com/redux');

const socketMW = createSocketMW(io, 'server/', { execute: executor });

// const loggerMiddleware = createLogger();


function executor(action, emit, next, dispatch) {
  emit('action', action);
  next(action);
}

const middleware = [
  socketMW,
  thunk
//   loggerMiddleware
];

const store = applyMiddleware(
    ...middleware
    )(createStore)(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Testing
store.subscribe(() => {
  console.log('New state:', store.getState());
});

export default store;

