const express = require('express');
const { models } = require('../sequelize/index.js');
const logger = require('../logger.js');
const routes = {
	ingredients: require('./routes/ingredients.js'),
  recipes: require('./routes/recipes.js'),
  stock: require('./routes/stock.js')
};

const app = express();

/**
 * Checks if user id and password are authorized
 * @param {string} id 
 * @param {string} password 
 * @returns { object } object with found and authorized boolean keys
 */
async function authorize(id, password) {
  const user = await models.User.findByPk(id);
  if (user) {
    if (user.password === password) {
      return { authorized: true, found: true };
    } else {
      return { authorized: false, found: true };
    }
  } else {
    return { authorized: false, found: false };
  }
}

app.use(function (req, res, next) {
  logger.log({ level: 'http', message: `${req.method} ${req.originalUrl}`, group: 'http' });
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// all endpoints below need authentication
app.use(function (req, res, next) {
  const id = req.query.id;
  const password = req.query.password;
  if (!id) return res.status(400).send('id query param must be set');
  if (!password) return res.status(400).send('password query param must be set');
  const { authorized, found } = authorize(id, password);
  if (!found) return res.status(404).send('Not found');
  if (!authorized) return res.status(401).send('Unauthorized');
  next();
});

app.get('/authorized', async (req, res) => {
  res.status(200).send('Found and authorized');
});

app.get('/ingredients', routes.ingredients.getAll);

app.get('/recipes', routes.recipes.getAll);

app.get('/stock', routes.stock.getAll);

module.exports = app;
