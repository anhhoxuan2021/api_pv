'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');
const Product =require('./product.model')

const P_Attribute = sequelize.define('product_attrs', {
  p_attr_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  p_sku: {
    type: DataTypes.STRING,
    allowNull: true,   
  },
  p_id: {
    type: DataTypes.STRING,
  allowNull: true
   },
  p_attr_capacity:{
    type: DataTypes.STRING,
  allowNull: true
  },
  p_attr_amount: {
    type: DataTypes.STRING,
  allowNull: true
  },
  p_attr_color: {
    type: DataTypes.STRING ,
  allowNull: true
  },
  p_attr_price: {
    type: DataTypes.DOUBLE ,
  allowNull: true
  },
  p_attrr_egular_price: {
    type: DataTypes.DOUBLE ,
  allowNull: true
  },
  p_attr_image: {
    type: DataTypes.STRING,
  allowNull: true
  },
  p_attr_more_images:{
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
Product.hasMany(P_Attribute, { foreignKey: 'p_id'});
P_Attribute.belongsTo(Product, { foreignKey: 'p_id'});

module.exports = P_Attribute;

