const joi = require('joi');
const logger = require('./logger.js');

// schema for validating users env variable
const usersSchema = joi.array().items(joi.object({
  id: joi.string(),
  password: joi.string()
}));
let users = [{ id: 'test', password: 'test' }]; // default users
if (process.env.FOOD_STOCK_MANAGER_USERS) {
  try {
    const parsedUsersEnv = JSON.parse(process.env.FOOD_STOCK_MANAGER_USERS.replace(/'/g, '"'));
    const { error } = usersSchema.validate(parsedUsersEnv);
    if (error) throw new Error(error);
    users = parsedUsersEnv;
  } catch (e) {
    logger.log({ level: 'error', message: `Error parsing or validating FOOD_STOCK_MANGER_USERS env variable: ${process.env.FOOD_STOCK_MANAGER_USERS}. Error: ${e.message}`, group: 'init' });
  }
}

module.exports = {
  users,
  postgres: {
    db: process.env.POSTGRES_DB || 'postgres',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
  } 
}