import configureMockStore from 'redux-mock-store';
import { addItem, ADD_ITEM } from './stockActions.js';

const mockStore = configureMockStore();

describe('Stock actions', () => {
  it('should handle new item', () => {
    const store = mockStore({ items: [] });

    const testItem = { name: 'lettuce', amount: 2 }

    const expectedActions = [
      { type: ADD_ITEM, item: testItem }
    ];

    expect.assertions(1);
    return store.dispatch(addItem(testItem.name, testItem.amount)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
