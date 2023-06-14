const { DataTypes } = require("sequelize");
const  sequelize  = require("../database/sequelize");
const Task = require("./task")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hashedPassword = bcrypt.hashSync(value, 10);
      this.setDataValue("password", hashedPassword);
    },
  },
});


//1 to many relation, connecting the User table to Task table
User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'task',
});


// JWT TOKEN
User.prototype.getJWTToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password
User.prototype.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
