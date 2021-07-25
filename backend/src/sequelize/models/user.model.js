const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize) => {
	const User = sequelize.define('User', {
		id: {
			primaryKey: true,
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING,
      allowNull: false,
			set(value) {
				// hash password before saving to db
				this.setDataValue('password', bcrypt.hashSync(value, bcrypt.genSaltSync(8), null));
			}
		},
	});

	User.prototype.validPassword = function(password) {
		return bcrypt.compareSync(password, this.password)
	};
};
