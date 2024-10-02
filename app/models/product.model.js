'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');


const Product = sequelize.define('products', {

  p_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  p_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  p_disctiption: {
    type: DataTypes.STRING,
    allowNull: true
  },
  p_short_disctiption: {
    type: DataTypes.STRING,
    allowNull: true
  },
  p_sex: {
    type: DataTypes.STRING,
    allowNull: true
  },
  p_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  p_special_point: {
    type: DataTypes.STRING,
    allowNull: true
  } ,
  p_tag: {
    type: DataTypes.STRING,
    allowNull: true
  },
  order_code: {
    type: DataTypes.STRING,
    allowNull: true
  } ,
  p_size_inch: {
    type: DataTypes.STRING,
    allowNull: true
  },
  p_demand: {
    type: DataTypes.STRING,
    allowNull: true
  },
  p_cpu: {
    type: DataTypes.STRING,
    allowNull: true
  },
  p_cpu_generation: {
    type: DataTypes.STRING,
    allowNull: true
  },  
  p_series: {
    type: DataTypes.STRING,
    allowNull: true
  },
  p_image_present: {
    type: DataTypes.STRING,
    allowNull: true
  },
  p_hard_disk: {
    type: DataTypes.STRING,
    allowNull: true
  },
  p_capacity: {
    type: DataTypes.STRING,
    allowNull: true
  }
  });  
 
// sequelize.sync().then(() => {  
//   console.log('Image table created successfully!');
// }).catch((error) => {
//   console.error('Unable to create table : ', error);
// });

module.exports = Product;
