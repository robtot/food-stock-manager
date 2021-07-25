const { models } = require('../../sequelize/index.js');

async function getAll(req, res) {
	const recipes = await models.Recipe.findAll({
		attributes: ['name', 'ingredients']
	});
	res.status(200).json(recipes);
};

module.exports = {
	getAll
};
