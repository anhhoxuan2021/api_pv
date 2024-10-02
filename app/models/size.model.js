'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');


const Size = sequelize.define('size', {  
  size_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  size_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
  });

sequelize.sync().then(() => {
  console.log('Image table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = Size;

