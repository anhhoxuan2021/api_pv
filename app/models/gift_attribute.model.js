'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');
const Gift =require('./gift.model')

const Gift_Attr = sequelize.define('gift_attrs', {
  gift_attr_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  gift_id: {
    type: DataTypes.INTEGER,
    allowNull: true,   
  },
  gift_att_ramount: {
    type: DataTypes.INTEGER,
  allowNull: true
   },
   gift_attr_color:{
    type: DataTypes.STRING,
  allowNull: true
  },
  gift_capacity: {
    type: DataTypes.STRING,
  allowNull: true
  },
  gift_attr_price: {
    type: DataTypes.DOUBLE ,
  allowNull: true
  },
  gift_attr_regular_price: {
    type: DataTypes.DOUBLE ,
  allowNull: true
  },
  gift_attr_image: {
    type: DataTypes.STRING ,
  allowNull: true
  },
  gift_attr_more_images: {
    type: DataTypes.STRING,
  allowNull: true
  }
  });

sequelize.sync().then(() => {
  console.log('Image table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

// Define one-to-many relationship
Gift.hasMany(Gift_Attr, { foreignKey: 'gift_id'});
Gift_Attr.belongsTo(Gift, { foreignKey: 'gift_id'});

module.exports = Gift_Attr;

