import logger from '../../logger.js';
import {
  getRecipes,
  getIngredients,
  getStock,
  addStockIngredient,
  subtractRecipeIngredientsFromStock
} from '../../api.js';

export const RECEIVE_RECIPES = 'RECEIVE_RECIPES';
export const RECEIVE_INGREDIENTS = 'RECEIVE_INGREDIENTS';
export const RECEIVE_STOCK = 'RECEIVE_STOCK';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

function receiveRecipes(recipes) {
  return {
      type: RECEIVE_RECIPES,
      recipes
  };
}

function receiveIngredients(ingredients) {
  return {
      type: RECEIVE_INGREDIENTS,
      ingredients
  };
}

function receiveStock(stock) {
  return {
      type: RECEIVE_STOCK,
      stock
  };
}

function receiveError(error) {
  return {
      type: RECEIVE_ERROR,
      error: error.message
  };
}

/**
 * Thunk action creator for fetching initial data
 */
export function fetchInitialData() {
  return function(dispatch, getState) {
    const { username, password } = getState().login;
    logger.log({ level: 'info', message: `Fetching recipes and ingredients`, group: 'Stock' });
    const getRecipesPromise = getRecipes(username, password)
      .then(response => dispatch(receiveRecipes(response)))
      .catch(error => {
        logger.log({ level: 'error', message: `Error fetching recipes: ${error}`, group: 'Stock' });
        dispatch(receiveError(error))
      });
    const getIngredientsPromise = getIngredients(username, password)
      .then(response => dispatch(receiveIngredients(response)))
      .catch(error => {
        logger.log({ level: 'error', message: `Error fetching ingredients: ${error}`, group: 'Stock' });
        dispatch(receiveError(error));
      });
    const getStockPromise = getStock(username, password)
      .then(response => dispatch(receiveStock(response)))
      .catch(error => {
        logger.log({ level: 'error', message: `Error fetching stock: ${error}`, group: 'Stock' });
        dispatch(receiveError(error));
      });
    return Promise.all([getRecipesPromise, getIngredientsPromise, getStockPromise]);
  };
}

/**
 * Thunk action creator for adding ingredient to stock
 */
export function addToStock(name, amount) {
  return function(dispatch, getState) {
    logger.log({ level: 'info', message: `Adding amount ${amount} of item ${name} to stock`, group: 'Stock' });
    const { username, password } = getState().login;
    return addStockIngredient(username, password, name, amount)
      .catch(error => {
        logger.log({ level: 'error', message: `Error adding ingredient to stock: ${error}`, group: 'Stock' });
        dispatch(receiveError(error));
      })
      .then(() => getStock(username, password)
      .then(response => dispatch(receiveStock(response)))
      .catch(error => {
        logger.log({ level: 'error', message: `Error fetching stock: ${error}`, group: 'Stock' });
        dispatch(receiveError(error));
      }));
  };
}

/**
 * Thunk action creator for subtracting recipe ingredients from stock
 */
 export function useRecipe(recipename) {
  return function(dispatch, getState) {
    logger.log({ level: 'info', message: `Using recipe ${recipename}`, group: 'Stock' });
    const { username, password } = getState().login;
    return subtractRecipeIngredientsFromStock(username, password, recipename)
      .catch(error => {
        logger.log({ level: 'error', message: `Error using recipe: ${error}`, group: 'Stock' });
        dispatch(receiveError(error));
      })
      .then(() => getStock(username, password)
      .then(response => dispatch(receiveStock(response)))
      .catch(error => {
        logger.log({ level: 'error', message: `Error fetching stock: ${error}`, group: 'Stock' });
        dispatch(receiveError(error));
      }));
  };
}
