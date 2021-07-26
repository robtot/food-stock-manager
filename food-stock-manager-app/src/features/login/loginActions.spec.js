import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { loggedIn, LOGGED_IN, receiveError, RECEIVE_ERROR, attemptLogin } from './loginActions.js';
import { initState } from './loginReducer.js';

const mockStore = configureMockStore([thunk]);

describe('login actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should log in user', () => {
    const store = mockStore({ login: initState });
    const testUsername = 'test';
    const testPassword = 'test';
    const expectedActions = [
      { type: LOGGED_IN, username: testUsername, password: testPassword }
    ];

    expect.assertions(1);
    store.dispatch(loggedIn(testUsername, testPassword));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should error', () => {
    const store = mockStore({ login: initState });
    const testErrorString = 'test';
    const testError = new Error(testErrorString);
    const expectedActions = [
      { type: RECEIVE_ERROR, error: testError.message }
    ];

    expect.assertions(1);
    store.dispatch(receiveError(testError));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('attempt user login success', () => {
    const store = mockStore({ login: initState });
    const testUsername = 'test';
    const testPassword = 'test';
    const expectedActions = [
      { type: LOGGED_IN, username: testUsername, password: testPassword }
    ];

    fetchMock.get('*', {
      status: 200
    });

    expect.assertions(1);
    return store.dispatch(attemptLogin(testUsername, testPassword)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('attempt user login fail', () => {
    const store = mockStore({ login: initState });
    const testUsername = 'test';
    const testPassword = 'test';
    const expectedActions = [
      { type: RECEIVE_ERROR, error: 'Unauthorized' }
    ];

    fetchMock.get('*', {
      status: 401
    });

    expect.assertions(1);
    return store.dispatch(attemptLogin(testUsername, testPassword)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
