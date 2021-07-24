const { models } = require('../../sequelize/index.js');

async function getAll(req, res) {
	const stock = await models.StockItem.findAll({
    where: {
      id: req.query.id
    }
  });
	res.status(200).json(stock);
};

module.exports = {
	getAll
};
