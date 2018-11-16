import { streamConstants } from '../_constants';
const axios = require('../api');

// Action Creators
const updateScheduledStreams = (scheduledStreams) => ({ type: streamConstants.SCHEDULED_STREAMS_UPDATE, payload: scheduledStreams  });

const updateActiveStreams = (activeStreams) => ({ type: streamConstants.ACTIVE_STREAMS_UPDATE, payload: activeStreams  });

const updateArchivedStreams = (archivedStreams) => ({ type: streamConstants.ARCHIVED_STREAMS_UPDATE, payload: archivedStreams  });

// AJAX ACTIONS
const fetchScheduledStreams = () => {
  return function (dispatch) {
    axios({
      method: 'get',
      url: `/api/scheduledStreams/`
    }).then((res) => {
      console.log('fetch result', res.data);
      // TODO refactor for how graphql structures response
      const scheduledStreams = Object.values(res.data)
      dispatch(updateScheduledStreams(scheduledStreams))
    }).catch((err) => {
      console.error('Error:', err.data);
      return false
    });
  };
}

const fetchActiveStreams = () => {
  return function (dispatch) {
    axios({
      method: 'get',
      url: `/api/activeStreams/`
    }).then((res) => {
      console.log('fetch result', res.data);
      // TODO refactor for how graphql structures response
      const activeStreams = Object.values(res.data);
      console.log(activeStreams);
      dispatch(updateActiveStreams(activeStreams));
    }).catch((err) => {
      console.error('Error:', err.data);
      return false
    });
  };
}

const fetchArchivedStreams = () => {
  return function (dispatch) {
    axios({
      method: 'get',
      url: `/api/archivedStreams/`
    }).then((res) => {
      console.log('fetch result', res.data);
      // TODO refactor for how graphql structures response
      const archivedStreams = Object.values(res.data);
      console.log(archivedStreams);
      dispatch(updateArchivedStreams(archivedStreams));
    }).catch((err) => {
      console.error('Error:', err.data);
      return false
    });
  };
}

export const streamsActions = {
  updateScheduledStreams,
  updateActiveStreams,
  updateActiveStreams,
  fetchScheduledStreams,
  fetchActiveStreams,
  fetchArchivedStreams
}