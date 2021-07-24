const { models } = require('../../sequelize/index.js');

async function getAll(req, res) {
	const recipes = await models.Recipe.findAll();
	res.status(200).json(recipes);
};

module.exports = {
	getAll
};
