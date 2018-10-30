const axios = require('../../../api');

// Outgoing
// async -> fetchBroadcasterStreams, postDeleteStream, postScheduledStream

const NEW_SCHEDULED_STREAM = 'NEW_SCHEDULED_STREAM';

// Incoming
const BROADCASTER_STREAMS_UPDATE = 'BROADCASTER_STREAMS_UPDATE';

// Action Creator
export const updateBroadcasterStreams = (scheduledStreams) => ({ type: BROADCASTER_STREAMS_UPDATE, payload: scheduledStreams });

export const newScheduledStream = (newStream) => ({ type: NEW_SCHEDULED_STREAM, payload: newStream });

// STREAM REDUCER
export const streamsReducer = (state = { scheduledStreams: ['empty'] }, action) => {
  switch(action.type) {
    case BROADCASTER_STREAMS_UPDATE:
      console.log('message recieved', action.payload);
      return { ...state, scheduledStreams: action.payload };

      case NEW_SCHEDULED_STREAM:
      console.log('new scheduled strean:', action.payload);
      return { ...state, scheduledStreams: [...scheduledStreams, action.payload] };

    default:
      return state;
  }
};

// AJAX Actions
export const fetchBroadcasterStreams = (userID) => {
  return function (dispatch) {
    axios({
      method: 'get',
      url: `/api/scheduledStreams/`
      // url: `/api/scheduledStreams?user_id=${userID}`
    }).then((streamsJSON) => {
      console.log(streamsJSON.data, 'in promise'); 
      // make array so we can map over for jsx elements
      const scheduledStreams = Object.values(streamsJSON.data);
      dispatch(updateBroadcasterStreams(scheduledStreams));
    }).catch((err) => {
      console.error('Error:', err.data);
      throw err
    });
  };
}

export const postScheduledStream = (stream) => {
  return function (dispatch) {
    axios({
      method: 'post',
      url: '/api/streams/',
      data: { stream }
    }).then((streamsJSON) => {
      console.log('Post scheduled API streams success', streamsJSON.data);
      dispatch(newScheduledStream());
    }).catch((err) => {
      console.error('Error: Post scheduled stream rejected:', err.data);
      throw err;
    });
  }
}

export const postDeleteStream = (streamID) => {
  return function (dispatch) {
    axios({
      method: 'delete',
      url: `/api/scheduledStreams?stream_id=${streamID}`
    }).then((streamsJSON) => {
      console.log(streamsJSON.data);
    }).catch((err) => {
      console.error('Error:', err.data);
      throw err;
    });
  }
}
