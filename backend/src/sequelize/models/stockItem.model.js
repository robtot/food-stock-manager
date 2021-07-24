const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('StockItem', {
		userId: {
			primaryKey: true,
			type: DataTypes.STRING,
			references: { model: 'Users', key: 'id' },
			onDelete: 'CASCADE'
		},
		name: {
			primaryKey: true,
			type: DataTypes.STRING,
			references: { model: 'Items', key: 'name' },
			onDelete: 'CASCADE'
		},
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
	});
};
