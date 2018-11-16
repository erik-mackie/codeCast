import { fileConstants } from '../_constants';


const updateFile = (fileID) => ({ type: fileConstants.FILE_REQUEST, payload: { fileID } });

export const fileActions = {
  updateFile
};