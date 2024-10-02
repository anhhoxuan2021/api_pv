'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');


const Brand = sequelize.define('brands', {
  brand_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  brand_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
  });

// sequelize.sync().then(() => {
//   console.log(' table created successfully!');
// }).catch((error) => {
//   console.error('Unable to create table : ', error);
// });

module.exports = Brand;

