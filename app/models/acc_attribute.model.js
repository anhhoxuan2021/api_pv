'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');
const Accessories =require('./accessory.model')

const ACC_Accessory = sequelize.define('accs_attrs', {
  accs_attr_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  accessory_sku: {
    type: DataTypes.STRING,
    allowNull: true,   
  },
  accessory_id: {
    type: DataTypes.INTEGER,
  allowNull: true
   },
   accs_attr_amount:{
    type: DataTypes.INTEGER,
  allowNull: true
  },
  accs_attr_color: {
    type: DataTypes.STRING,
  allowNull: true
  },
  accs_attr_price: {
    type: DataTypes.DOUBLE ,
  allowNull: true
  },
  accs_attr_regular_price: {
    type: DataTypes.DOUBLE ,
  allowNull: true
  },
  accs_attr_image: {
    type: DataTypes.STRING ,
  allowNull: true
  },
  accs_attr_more_images: {
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
Accessories.hasMany(ACC_Accessory, { foreignKey: 'accessory_id'});
ACC_Accessory.belongsTo(Accessories, { foreignKey: 'accessory_id'});

module.exports = ACC_Accessory;

