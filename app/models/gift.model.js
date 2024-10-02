'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');


const Gift = sequelize.define('accessories', {

  gift_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  gift_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gift_disctiption: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gift_short_disctiption: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gift_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gift_special_point: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gift_tag: {
    type: DataTypes.INTEGER,
    allowNull: true
  } ,
  gift_order_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gift_image: {
    type: DataTypes.STRING,
    allowNull: true
  } ,
  gift_size_inch: {
    type: DataTypes.STRING,
    allowNull: true
  }
  });

// sequelize.sync().then(() => {
//   console.log('Image table created successfully!');
// }).catch((error) => {
//   console.error('Unable to create table : ', error);
// });

module.exports = Gift;
