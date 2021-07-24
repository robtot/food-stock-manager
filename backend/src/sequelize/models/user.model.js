const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('User', {
		id: {
			primaryKey: true,
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING,
      allowNull: false
		},
	});
};
