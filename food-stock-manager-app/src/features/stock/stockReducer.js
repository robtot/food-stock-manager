import {
  RECEIVE_RECIPES,
  RECEIVE_INGREDIENTS,
  RECEIVE_STOCK,
  RECEIVE_ERROR
} from './stockActions.js';

export const initState = {
  stock: [],
  recipes: [],
  ingredients: [],
  isError: false
};

export default function stock(state = initState, action) {
  switch (action.type) {
    case RECEIVE_RECIPES:
      return {
        ...state,
        recipes: action.recipes
      };
    case RECEIVE_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients
      };
    case RECEIVE_STOCK:
      return {
        ...state,
        stock: action.stock
      };
    case RECEIVE_ERROR:
      return {
        ...state,
        isError: true
      }
    default:
      return state;
  }
}
