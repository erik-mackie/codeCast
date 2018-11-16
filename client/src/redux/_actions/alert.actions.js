import { alertConstants } from '../_constants';


const success = (message) => {
    return { type: alertConstants.SUCCESS, payload: { message } };
}

const error = (message) => {
    return { type: alertConstants.ERROR, payload: { message } };
}

const clear = () => {
    return { type: alertConstants.CLEAR };
}

export const alertActions = {
    success,
    error,
    clear
};

