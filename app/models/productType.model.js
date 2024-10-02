'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');

const Brand =require('./brand.model')

const ProductType = sequelize.define('product_types', {
  prd_type_id  : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  prd_type_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  prd_type_brand: {
    type: DataTypes.STRING,
    allowNull: true
  },
  prd_type_group: {
    type: DataTypes.STRING,
    allowNull: true
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: true
  }
  });

// sequelize.sync().then(() => {
//   console.log(' table created successfully!');
// }).catch((error) => {
//   console.error('Unable to create table : ', error);
// });

// Define one-to-many relationship
Brand.hasMany(ProductType, { foreignKey: 'prd_type_brand',as: 'product_types'});
ProductType.belongsTo(Brand, { foreignKey: 'prd_type_brand', as: 'brand'});

module.exports = ProductType;

