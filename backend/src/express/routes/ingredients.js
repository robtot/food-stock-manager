const { models } = require('../../sequelize/index.js');

async function getAll(req, res) {
	const items = await models.Item.findAll();
	res.status(200).json(items);
};

module.exports = {
	getAll
};
