// Outgoing
const FILE_REQUEST = 'server/file_change';

// Incoming

// Action Creators
export const updateFile = (fileID) => ({ type: FILE_REQUEST, payload: { fileID } });

// DIRECTORY REDUCER
const directoryState = {directoryStructure: { 'Next Great Thing': null }};

export const directoryReducer = (state = directoryState, action) => {
  switch (action.type) {
    case 'DIRECTORY_UPDATE':
      console.log('directory_update action', action.payload)
      return { ...state, directoryStructure: action.payload };
    
    default:
      return state;
  }
}
