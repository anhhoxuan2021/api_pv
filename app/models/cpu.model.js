'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');


const CPU = sequelize.define('cpu', {
  cpu_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cpu_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
  });

sequelize.sync().then(() => {
  console.log('cpu table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = CPU;

