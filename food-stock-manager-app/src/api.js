import logger from './logger.js';

/**
 * Checks if username and password are valid
 */
export function authenticate(username, password) {
  const url = `http://localhost:3000/authorized?id=${username}&password=${password}`;
  logger.log({ level: 'http', message: `GET ${url}`, group: 'API' });
  return fetch(url).then(response => {
      if (response.ok) {
          return Promise.resolve(response);
      } else {
          const error = new Error(response.statusText);
          error.response = response;
          return Promise.reject(error);
      }
  });
}

/**
 * Gets all ingredient names
 */
export function getIngredients(username, password) {
  const url = `http://localhost:3000/ingredients?id=${username}&password=${password}`;
  logger.log({ level: 'http', message: `GET ${url}`, group: 'API' });
  return fetch(url).then(response => {
      if (response.ok) {
          return Promise.resolve(response.json());
      } else {
          const error = new Error(response.statusText);
          error.response = response;
          return Promise.reject(error);
      }
  });
}

/**
 * Gets all recipes
 */
export function getRecipes(username, password) {
  const url = `http://localhost:3000/recipes?id=${username}&password=${password}`;
  logger.log({ level: 'http', message: `GET ${url}`, group: 'API' });
  return fetch(url).then(response => {
      if (response.ok) {
          return Promise.resolve(response.json());
      } else {
          const error = new Error(response.statusText);
          error.response = response;
          return Promise.reject(error);
      }
  });
}

/**
 * Gets all ingredients with amount in stock
 */
 export function getStock(username, password) {
  const url = `http://localhost:3000/stock?id=${username}&password=${password}`;
  logger.log({ level: 'http', message: `GET ${url}`, group: 'API' });
  return fetch(url).then(response => {
      if (response.ok) {
          return Promise.resolve(response.json());
      } else {
          const error = new Error(response.statusText);
          error.response = response;
          return Promise.reject(error);
      }
  });
}

/**
 * Adds given amount of ingredient to stock
 */
 export function addStockIngredient(username, password, ingredient, amount) {
  const url = `http://localhost:3000/stock?id=${username}&password=${password}`;
  logger.log({ level: 'http', message: `PUT ${url}`, group: 'API' });
  return fetch(url, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name: ingredient, amount }),
  }).then(response => {
      if (response.ok) {
          return Promise.resolve(response.json());
      } else {
          const error = new Error(response.statusText);
          error.response = response;
          return Promise.reject(error);
      }
  });
}

/**
 * Subtracts amount of ingredients from stock required for recipe
 */
 export function subtractRecipeIngredientsFromStock(username, password, recipeName) {
  const url = `http://localhost:3000/recipe?id=${username}&password=${password}&recipe=${recipeName}`;
  logger.log({ level: 'http', message: `PATCH ${url}`, group: 'API' });
  return fetch(url, {
    method: 'PATCH',
  }).then(response => {
      if (response.ok) {
          return Promise.resolve(response);
      } else {
          const error = new Error(response.statusText);
          error.response = response;
          return Promise.reject(error);
      }
  });
}
