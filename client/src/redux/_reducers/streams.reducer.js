import { streamConstants } from '../_constants';

// STREAM REDUCER

export const streamsReducer = (state = { activeStreams: ['noStreams'], scheduledStreams: ['noStreams'], archivedStreams: ['noStreams'] }, action) => {
  switch(action.type) {
    case streamConstants.SCHEDULED_STREAMS_UPDATE:
      console.log('userstreams update', action.payload);
      return { ...state, scheduledStreams: action.payload }

    case streamConstants.ACTIVE_STREAMS_UPDATE:
    console.log('userstreams update', action.payload);
    return { ...state, activeStreams: action.payload }

    case streamConstants.ARCHIVED_STREAMS_UPDATE:
    console.log('userstreams update', action.payload);
    return { ...state, archivedStreams: action.payload }

    default:
      return state;
  }
};