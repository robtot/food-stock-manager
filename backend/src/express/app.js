const express = require('express');
var cors = require('cors');
const { models } = require('../sequelize/index.js');
const logger = require('../logger.js');
const routes = {
	ingredients: require('./routes/ingredients.js'),
  recipes: require('./routes/recipes.js'),
  stock: require('./routes/stock.js')
};

/**
 * Checks if user id and password are authorized
 * @param {string} id 
 * @param {string} password 
 * @returns { object } object with found and authorized boolean keys
 */
 async function authenticate(id, password) {
  const user = await models.User.findByPk(id);
  if (user) {
    if (user.validPassword(password)) {
      return { authorized: true, found: true };
    } else {
      return { authorized: false, found: true };
    }
  } else {
    return { authorized: false, found: false };
  }
}

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

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
  authenticate(id, password).then(result => {
    if (!result.found) return res.status(404).send('Not found');
    if (!result.authorized) return res.status(401).send('Unauthorized');
    next();
  }).catch(e => next(e));
});

app.get('/authorized', async (req, res) => {
  res.status(200).send('Found and authorized');
});

app.get('/ingredients', routes.ingredients.getAll);

app.get('/recipes', routes.recipes.getAll);

app.get('/stock', routes.stock.getAll);

app.put('/stock', routes.stock.addToStock);

app.patch('/recipe', routes.stock.subtractRecipeIngredientsFromStock);

module.exports = app;
