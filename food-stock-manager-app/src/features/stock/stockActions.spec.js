import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { RECEIVE_RECIPES, RECEIVE_INGREDIENTS, RECEIVE_STOCK, RECEIVE_ERROR, addToStock, fetchInitialData, useRecipe } from './stockActions.js';
import { initState } from './stockReducer.js';

const mockStore = configureMockStore([thunk]);

describe('login actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should fetch initial data', () => {
    const store = mockStore({ stock: initState, login: { username: 'test', password: 'test' } });
    const testIngredients = [
      { name: 'A' },
      { name: 'B' }
    ];
    const testRecipes = [
      { name: 'recipe1', ingredients: [{ name: 'A', amount: 1 }] },
      { name: 'recipe2', ingredients: [{ name: 'B', amount: 2 }] }
    ];
    const testStock = [
      { name: 'A', amount: 2 },
      { name: 'B', amount: 3 }
    ];

    const expectedActions = [
      { type: RECEIVE_RECIPES, recipes: testRecipes },
      { type: RECEIVE_INGREDIENTS, ingredients: testIngredients },
      { type: RECEIVE_STOCK, stock: testStock }
    ];

    fetchMock.get('path:/recipes', { status: 200, body: testRecipes });
    fetchMock.get('path:/ingredients', { status: 200, body: testIngredients });
    fetchMock.get('path:/stock', { status: 200, body: testStock });

    expect.assertions(1);
    return store.dispatch(fetchInitialData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should fetch initial data fail', () => {
    const store = mockStore({ stock: initState, login: { username: 'test', password: 'test' } });
    const expectedActions = [
      { type: RECEIVE_ERROR, error: 'Unauthorized' },
      { type: RECEIVE_ERROR, error: 'Unauthorized' },
      { type: RECEIVE_ERROR, error: 'Unauthorized' }
    ];

    fetchMock.get('*', { status: 401 });

    expect.assertions(1);
    return store.dispatch(fetchInitialData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should add to stock', () => {
    const store = mockStore({ stock: initState, login: { username: 'test', password: 'test' } });
    const testItemName = 'A';
    const testItemAmount = 2;
    const testStock = [
      { name: 'A', amount: 2 },
      { name: 'B', amount: 3 }
    ];

    const expectedActions = [
      { type: RECEIVE_STOCK, stock: testStock }
    ];

    fetchMock.put('*', { status: 200, body: { name: 'A', amount: 2 } });
    fetchMock.get('path:/stock', { status: 200, body: testStock });

    expect.assertions(1);
    return store.dispatch(addToStock(testItemName, testItemAmount)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should use recipe', () => {
    const store = mockStore({ stock: initState, login: { username: 'test', password: 'test' } });
    const testRecipeName = 'recipe1';
    const testStock = [
      { name: 'A', amount: 2 },
      { name: 'B', amount: 3 }
    ];

    const expectedActions = [
      { type: RECEIVE_STOCK, stock: testStock }
    ];

    fetchMock.patch('*', { status: 200 });
    fetchMock.get('path:/stock', { status: 200, body: testStock });

    expect.assertions(1);
    return store.dispatch(useRecipe(testRecipeName)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
