'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');


const Accessories = sequelize.define('accessories', {

  accessory_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  accessory_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  accessory_disctiption: {
    type: DataTypes.STRING,
    allowNull: true
  },
  accessory_short_disctiption: {
    type: DataTypes.STRING,
    allowNull: true
  },
  accessory_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  accessory_special_point: {
    type: DataTypes.STRING,
    allowNull: true
  },
  accessory_attr: {
    type: DataTypes.INTEGER,
    allowNull: true
  } ,
  accessory_tag: {
    type: DataTypes.STRING,
    allowNull: true
  },
  accessory_order_code: {
    type: DataTypes.STRING,
    allowNull: true
  } ,
  accessory_size_inch: {
    type: DataTypes.STRING,
    allowNull: true
  },
  accessory_image: {
    type: DataTypes.STRING,
    allowNull: true
  },

  });

// sequelize.sync().then(() => {
//   console.log('Image table created successfully!');
// }).catch((error) => {
//   console.error('Unable to create table : ', error);
// });

module.exports = Accessories;
