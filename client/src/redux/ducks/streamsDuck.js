import { fetchBroadcasterStreams } from './ajaxDuck'

// // Outgoing
// const OUTGOING_MESSAGE = 'server/message';
// const NEW_CONNECTION = 'server/new_connection';

// Incoming
// const INCOMING_MESSAGE = 'NEW_MESSAGE'
// const INCOMING_NOTIFICATION = 'NEW_NOTIFICATION'
const BROADCASTER_STREAMS_UPDATE = 'UPDATE_USER_STREAMS'

// Action Creator
export const updateBroadcasterStreams = (scheduledStreams) => ({ type: BROADCASTER_STREAMS_UPDATE, payload: scheduledStreams  });

// STREAM REDUCER

export const streamsReducer = (state = {}, action) => {
  switch(action.type) {
    case BROADCASTER_STREAMS_UPDATE:
      console.log('message recieved', action.payload);
      let steamsArray = shitballs()
      return shitballs(state);

    default:
      return state;
  }
};
 
async function shitballs(state) {
  let resultArr = [];
  let resultObj = await fetchBroadcasterStreams(1);
  for (let item in resultObj) {
    resultArr.push(resultObj[item]);
  }
  return await { ...state, scheduledStreams: resultArr };
}

