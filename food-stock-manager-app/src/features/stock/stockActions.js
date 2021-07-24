const logger = require('../../logger.js');

export const ADD_ITEM = 'ADD_ITEM';

/**
 * Adds given amount of an item to stock
 * @param {string} name item name
 * @param {number} amount amount of item
 */
export function addItem(name, amount) {
  logger.log({ level: 'info', message: `Adding amount ${amount} of item ${name} to stock`, group: 'Stock' });
  return {
      type: ADD_ITEM,
      item: { name, amount }
  };
}
