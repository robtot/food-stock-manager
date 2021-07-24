import reducer, { initState } from './stockReducer.js';

function sortByNameKey(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

describe('Stock reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      items: []
    });
  });

  it('should handle new item', () => {
    const actual = reducer(initState, { type: 'ADD_ITEM', action: { item: { name: 'lettuce', amount: 2 } } });
    expect(actual.items.sort(sortByNameKey)).toEqual([{ name: 'lettuce', amount: 2 }].sort(sortByNameKey));
  });

  it('should handle increment', () => {
    const actual = reducer({ items: [{ name: 'lettuce', amount: 2 }] }, { type: 'ADD_ITEM', action: { item: { name: 'lettuce', amount: 1 } } });
    expect(actual.items.sort(sortByNameKey)).toEqual([{ name: 'lettuce', amount: 3 }].sort(sortByNameKey));
  });

  it('should handle multiple items', () => {
    const actual = reducer({ items: [{ name: 'lettuce', amount: 3 }] }, { type: 'ADD_ITEM', action: { item: { name: 'tomato', amount: 5 } } });
    expect(actual.items.sort(sortByNameKey)).toEqual([{ name: 'lettuce', amount: 3 }, { name: 'tomato', amount: 5 }].sort(sortByNameKey));
  });
});
