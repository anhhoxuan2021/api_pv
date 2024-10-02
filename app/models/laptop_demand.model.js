'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');


const LaptopDemand = sequelize.define('laptop_demand', {
  latop_deman_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  latop_deman_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
  });

sequelize.sync().then(() => {
  console.log(' table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = LaptopDemand;
