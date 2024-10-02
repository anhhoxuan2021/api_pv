'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');


const CPUGenerate = sequelize.define('cpu_generation', {
  cpu_generation_id  : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cpu_generation_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
  });

sequelize.sync().then(() => {
  console.log(' table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = CPUGenerate;


