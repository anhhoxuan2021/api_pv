'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');
const Laptop =require('./laptop.model')

const Attribute = sequelize.define('attributes', {
  attr_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  laptop_sku: {
    type: DataTypes.STRING,
    allowNull: true,   
},
  latop_id: {
    type: DataTypes.INTEGER,
    allowNull: true,   
},
  capacity: {
    type: DataTypes.STRING,
  allowNull: true
   },
   amount:{
    type: DataTypes.STRING,
  allowNull: true
  },
  color: {
    type: DataTypes.STRING,
  allowNull: true
  },
  price: {
    type: DataTypes.DOUBLE ,
  allowNull: true
  },
  regular_price: {
    type: DataTypes.DOUBLE ,
  allowNull: true
  },
  image: {
    type: DataTypes.STRING,
  allowNull: true
  },
  more_images:{
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
Laptop.hasMany(Attribute, { foreignKey: 'latop_id'});
Attribute.belongsTo(Laptop, { foreignKey: 'latop_id'});

module.exports = Attribute;

