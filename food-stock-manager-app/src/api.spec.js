import fetchMock from 'fetch-mock';
import { authenticate, getIngredients, getRecipes, getStock, addStockIngredient, subtractRecipeIngredientsFromStock } from './api.js';

describe('api', () => {
  afterEach(() => {
      fetchMock.restore()
  });

  it('Authenticate success', () => {
    fetchMock.get('*', {
        status: 200
    });

    expect.assertions(1);
    return expect(authenticate('test', 'test')).resolves.toEqual(true);
  });

  it('Authenticate fail', () => {
    fetchMock.get('*', {
        status: 401
    });

    expect.assertions(1);
    return expect(authenticate('test', 'test')).rejects.toThrow('Unauthorized');
  });

  it('Get ingredients', () => {
    const testIngredients = [
      { name: 'A' },
      { name: 'B' }
    ];

    fetchMock.get('*', {
        status: 200,
        body: testIngredients
    });

    expect.assertions(1);
    return expect(getIngredients('test', 'test')).resolves.toEqual(testIngredients);
  });

  it('Get ingredients fail', () => {
    fetchMock.get('*', {
        status: 401
    });

    expect.assertions(1);
    return expect(getIngredients('test', 'test')).rejects.toThrow('Unauthorized');
  });

  it('Get recipes', () => {
    const testRecipes = [
      { name: 'A', ingredients: [{ name: 'tomato', amount: 1 }] },
      { name: 'B', ingredients: [{ name: 'cabbage', amount: 2 }] }
    ];

    fetchMock.get('*', {
        status: 200,
        body: testRecipes
    });

    expect.assertions(1);
    return expect(getRecipes('test', 'test')).resolves.toEqual(testRecipes);
  });

  it('Get recipes fail', () => {
    fetchMock.get('*', {
        status: 401
    });

    expect.assertions(1);
    return expect(getRecipes('test', 'test')).rejects.toThrow('Unauthorized');
  });

  it('Get stock', () => {
    const testStock = [
      { name: 'A', amount: 2 },
      { name: 'B', amount: 3 }
    ];

    fetchMock.get('*', {
        status: 200,
        body: testStock
    });

    expect.assertions(1);
    return expect(getStock('test', 'test')).resolves.toEqual(testStock);
  });

  it('Get stock fail', () => {
    fetchMock.get('*', {
        status: 401
    });

    expect.assertions(1);
    return expect(getStock('test', 'test')).rejects.toThrow('Unauthorized');
  });

  it('Put stock', () => {
    const testStockItem = { name: 'A', amount: 3 };

    fetchMock.put('*', {
        status: 200,
        body: testStockItem
    });

    expect.assertions(1);
    return expect(addStockIngredient('test', 'test', 'test', 3)).resolves.toEqual(testStockItem);
  });

  it('Put stock fail', () => {
    fetchMock.put('*', {
        status: 401
    });

    expect.assertions(1);
    return expect(addStockIngredient('test', 'test', 'test', 3)).rejects.toThrow('Unauthorized');
  });

  it('Use recipe', () => {
    fetchMock.patch('*', {
        status: 200
    });

    expect.assertions(1);
    return expect(subtractRecipeIngredientsFromStock('test', 'test', 'test')).resolves.toEqual(true);
  });

  it('Use recipe fail', () => {
    fetchMock.patch('*', {
        status: 401
    });

    expect.assertions(1);
    return expect(subtractRecipeIngredientsFromStock('test', 'test', 'test')).rejects.toThrow('Unauthorized');
  });
});
