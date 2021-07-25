const { Sequelize } = require('sequelize');
const logger = require('../logger.js');
const config = require('../config.js');

const postgresConnectionUrl = `postgres://${config.postgres.user}:${config.postgres.password}@${config.postgres.host}:5432/${config.postgres.db}`;
logger.log({ level: 'info', message: `Attempting to connect to Postgres with url: ${postgresConnectionUrl}`, group: 'db' })
const sequelize = new Sequelize(postgresConnectionUrl, {
  logging: (msg) => logger.log({ level: 'verbose', message: msg, group: 'db' }),
  dialect: 'postgres'
});

const modelDefiners = [
	require('./models/user.model.js'),
  require('./models/recipe.model.js'),
  require('./models/item.model.js'),
  require('./models/stockItem.model.js')
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// apply associations
const { User, StockItem, Item } = sequelize.models;
User.hasMany(StockItem);
Item.hasMany(StockItem);

module.exports = sequelize;
