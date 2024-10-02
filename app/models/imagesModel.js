const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');


const Image = sequelize.define('images', {
  img_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  img_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  img_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  img_path: true
});

sequelize.sync().then(() => {
  console.log('Image table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = Image;