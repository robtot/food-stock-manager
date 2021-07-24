const { Sequelize } = require('sequelize');
const logger = require('../logger.js');

const sequelize = new Sequelize('postgres://postgres:postgres@db:5432/postgres', { logging: (msg) => logger.log({ level: 'verbose', message: msg, group: 'db' }) });

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
