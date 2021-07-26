import reducer, { initState } from './loginReducer.js';
import { LOGGED_IN, RECEIVE_ERROR } from './loginActions.js';

describe('Login reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initState);
  });

  it('should handle login', () => {
    const testUsername = 'test';
    const testPassword = 'test';
    const actual = reducer(initState, { type: LOGGED_IN, username: testUsername, password: testPassword });
    expect(actual.username).toEqual(testUsername);
    expect(actual.password).toEqual(testPassword);
    expect(actual.loginFailed).toEqual(false);
    expect(actual.authenticated).toEqual(true);
  });

  it('should handle login fail', () => {
    const actual = reducer(initState, { type: RECEIVE_ERROR, error: 'TestError' });
    expect(actual.username).toEqual('');
    expect(actual.password).toEqual('');
    expect(actual.loginFailed).toEqual(true);
    expect(actual.authenticated).toEqual(false);
  });
});
