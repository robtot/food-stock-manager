import { LOGGED_IN, RECEIVE_ERROR } from './loginActions.js';

export const initState = {
  username: '',
  password: '',
  authenticated: false,
  loginFailed: false
};

export default function login(state = initState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        username: action.username,
        password: action.password,
        authenticated: true,
        loginFailed: false
      };
    case RECEIVE_ERROR:
      return {
        ...state,
        username: '',
        password: '',
        authenticated: false,
        loginFailed: true
      };
    default:
      return state;
  }
}
