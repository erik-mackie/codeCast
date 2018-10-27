function actionCreator(type, ...argNames) {
  return function(...args) {
    const action = { type };
    argNames.forEach((arg, i) => {
      action[argNames[i]] = args[i];
    });
    return action;
  };
}

const message = 'server/message';
const newConn = 'server/new_connection';
const fileChange = 'server/file_change';
const changeTheme = 'server/change_theme'; 
const lookUpFileHash = 'server/look_up_file_hash';


export const newConnection = actionCreator(newConn, 'payload');

export const newMessage = actionCreator(message, 'payload');

export const updateFile = actionCreator(fileChange, 'payload');

export const changeMirrorTheme = actionCreator(changeTheme, 'payload');

// export const getRequestedFile = actionCreator(getDisplayFile, hash);

export const compareHashToServer = (hash) => ({type: lookUpFileHash, payload: hash});

