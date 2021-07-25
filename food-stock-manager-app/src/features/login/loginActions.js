import logger from '../../logger.js';
import {
  authenticate
} from '../../api.js';

export const LOGGED_IN = 'LOGGED_IN';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export function loggedIn(username, password) {
  logger.log({ level: 'info', message: `Logged in as user ${username}`, group: 'Auth' });
  return {
      type: LOGGED_IN,
      username,
      password
  };
}

export function receiveError(error) {
  return {
      type: RECEIVE_ERROR,
      error: error.message
  };
}

/**
 * Thunk action creator for attempting login
 */
 export function attemptLogin(username, password) {
  return function(dispatch) {
    logger.log({ level: 'info', message: `Attempting login for user ${username}`, group: 'Auth' });
    return authenticate(username, password)
      .then(() => dispatch(loggedIn(username, password)))
      .catch(error => {
        logger.log({ level: 'info', message: `Error authenticating: ${error}`, group: 'Auth' });
        dispatch(receiveError(error))
      });
  };
}
