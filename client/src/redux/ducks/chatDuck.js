import randomMessage from '../../StreamComponents/Chat/messages/initialMessageUtil'

// Outgoing
const OUTGOING_MESSAGE = 'server/message';
const NEW_CONNECTION = 'server/new_connection';

// Incoming
const INCOMING_MESSAGE = 'NEW_MESSAGE'
const INCOMING_NOTIFICATION = 'NEW_NOTIFICATION'
const USERNAME_CHANGE = 'USERNAME_CHANGE'

// Action Creator
export const newConnection = () => ({ type: NEW_CONNECTION, payload: {} });

export const sendMessage = (message) => ({ type: OUTGOING_MESSAGE, payload: { message } });

export const changeUsername = (username) => ({ type: USERNAME_CHANGE, payload: { username } });

// CHAT REDUCER
const chatState = { 
  messages: [randomMessage()], 
  notifications: [],
  username: 'anon'
};
export const chatReducer = (state = chatState, action) => {
  switch(action.type) {
    case INCOMING_MESSAGE:
      console.log('message recieved', action.payload);
      return {...state, messages: [...state.messages, action.payload] };
    case INCOMING_NOTIFICATION:
      console.log('notification recieved', action.payload)
      return {...state, notifications: action.payload}
    case USERNAME_CHANGE: 
      // Should be moved to user reducer when
      // more user actions can be defined
      console.log('username changed', action.payload)
      return {...state, username: action.payload}
    default:
      return state;
  }
};