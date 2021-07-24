  const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('Recipe', {
		name: {
			primaryKey: true,
			type: DataTypes.STRING
		},
		ingredients: {
			type: DataTypes.JSON,
			allowNull: false
		},
	});
};