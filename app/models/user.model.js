'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');


const User = sequelize.define('users', {
  id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING,
  allowNull: true
   },
   email:{
    type: DataTypes.STRING,
  allowNull: true
  },
  password: {
    type: DataTypes.STRING,
  allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
  allowNull: true
  },
  city: {
    type: DataTypes.STRING,
  allowNull: true
  },
  state: {
    type: DataTypes.STRING,
  allowNull: true
  },
  zip:{
    type: DataTypes.STRING,
  allowNull: true
  },
  address: {
    type: DataTypes.STRING,
  allowNull: true
  },
  role: {
    type: DataTypes.STRING,
  allowNull: true
  },
  avatar:{
    type: DataTypes.STRING,
  allowNull: true
  },
  permission: {
    type: DataTypes.STRING,
  allowNull: true
  }
  });

sequelize.sync().then(() => {
  console.log('Image table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = User;

