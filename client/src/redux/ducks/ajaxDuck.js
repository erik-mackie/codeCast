import { updateBroadcasterStreams } from './streamsDuck.js';
import store from './actions/index.js';
const axios = require('./api');

export const fetchBroadcasterStreams = (userID) => {

  //ajax get request to server url. Get streams based off userID
  axios({
    method: 'get',
    url: `/api/scheduledStreams?user_id=${userID}`
  }).then((res) => {
    store.dispatch(updateBroadcasterStreams(res))
    console.log(res.data);
  }).catch((err) => {
    console.error('Error:', err.data);
    throw err;
  });
}

export const postDeleteStream = (streamID) => {

  axios({
    method: 'delete',
    url: `/api/scheduledStreams?stream_id=${streamID}`
  }).then((res) => {
    console.log(res.data);
  }).catch((err) => {
    console.error('Error:', err.data);
    throw err;
  });
}
