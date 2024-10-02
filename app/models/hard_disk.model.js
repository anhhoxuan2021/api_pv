'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');


const Harddisk = sequelize.define('hard_dishes', {
  harddisk_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  harddisk_capacity: {
    type: DataTypes.STRING,
    allowNull: true
  }
  });

sequelize.sync().then(() => {
  console.log('hard_dish table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = Harddisk;

