import { ADD_ITEM } from './stockActions.js';

export const initState = {
  items: []
};

export default function stock(state = initState, action) {
  switch (action.type) {
    case ADD_ITEM:
      let newItems;
      const foundIndex = state.items.findIndex(item => item.name === action.item.name);
      if (foundIndex !== -1) {
        // item already exists so increment
        const newItemAmount = state.items[foundIndex].amount + action.item.amount;
        newItems = state.items.map((item, i) => i === foundIndex ? Object.assign({}, item, { amount: newItemAmount}) : item);
      } else {
        // add item to stock array
        newItems = [...state.items, action.item];
      }

      return {
        ...state,
        items: newItems
      };
    default:
      return state;
  }
}
