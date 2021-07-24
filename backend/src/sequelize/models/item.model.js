  const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('Item', {
		name: {
			primaryKey: true,
			type: DataTypes.STRING
		}
	});
};
