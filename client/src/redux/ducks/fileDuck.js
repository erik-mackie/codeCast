// Outgoing

// Incoming
const FILE_UPDATE = 'FILE_UPDATE'

// Action Creators


// FILE REDUCER
const fileState = { activeFileContents: 'Welcome to codeCast! Click on a file in the explorer to see its contents!'}
export const fileReducer = (state = fileState, action) => {
  switch (action.type) {
    case FILE_UPDATE:
      console.log('File Update', action.payload)
      return { ...state, activeFileContents: action.payload }
    
    default:
      return state;
  }
}