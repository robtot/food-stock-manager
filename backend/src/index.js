const app = require("./express/app.js");
const sequelize = require('./sequelize/index.js');
const logger = require('./logger.js');
const config = require('./config.js');
const { models } = require('./sequelize/index.js');

const port = 3000;

async function assertDatabaseConnectionOk() {
	logger.log({ level: 'info', message: 'Checking database connection...', group: 'init' });
	try {
		await sequelize.authenticate();
		logger.log({ level: 'info', message: `Connected to database!` });
		await sequelize.sync({ alter: true });
		logger.log({ level: 'info', message: `All database models synchronized`,  group: 'init' });

		//
		// Populate DB with necessary data on startup
		//

		// add users from config
		const users = config.users;
		for (const user of users) {
			logger.log({ level: 'info', message: `Upserting user ${user.id} to DB`,  group: 'init' });
			await models.User.upsert(user);
		}
		logger.log({ level: 'info', message: `Users upserted to DB`,  group: 'init' });

		// add ingredients/items
		const ingredients = ['tomato', 'cabbage', 'apple', 'banana', 'fish', 'meat', 'pasta', 'flour', 'egg'];
		for (const ingredient of ingredients) {
			await models.Item.upsert({ name: ingredient });
		}
		logger.log({ level: 'info', message: `Ingredients upserted to DB`,  group: 'init' });
	
		// add recipes
		const recipes = [
			{
				name: 'Fruit salad',
				ingredients: [
					{
						name: 'apple',
						amount: 1
					},
					{
						name: 'banana',
						amount: 1
					}
				]
			},
			{
				name: 'Salad',
				ingredients: [
					{
						name: 'cabbage',
						amount: 1
					},
					{
						name: 'tomato',
						amount: 2
					}
				]
			},
			{
				name: 'Hamburger',
				ingredients: [
					{
						name: 'flour',
						amount: 1
					},
					{
						name: 'meat',
						amount: 1
					},
					{
						name: 'tomato',
						amount: 1
					}
				]
			},
			{
				name: 'Pasta Carbonara',
				ingredients: [
					{
						name: 'pasta',
						amount: 2
					},
					{
						name: 'meat',
						amount: 1
					},
					{
						name: 'egg',
						amount: 1
					}
				]
			},
			{
				name: 'Fish dish',
				ingredients: [
					{
						name: 'fish',
						amount: 1
					},
					{
						name: 'cabbage',
						amount: 1
					},
					{
						name: 'tomato',
						amount: 1
					}
				]
			}
		];
		for (const recipe of recipes) {
			await models.Recipe.upsert(recipe);
		}
		logger.log({ level: 'info', message: `Recipes upserted to DB`,  group: 'init' });
	} catch (error) {
		logger.log({ level: 'error', message: `DB connection error: ${error.message}`, group: 'init' });
		process.exit(1);
	}
}

async function init() {
	await assertDatabaseConnectionOk();

	app.listen(port, () => {
		logger.log({ level: 'info', message: `Food Stock Manager API listening at http://localhost:${port}`,  group: 'init' });
  });
}

init();
