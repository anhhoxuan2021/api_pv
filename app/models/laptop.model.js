'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../common/connectysql2.js');

const Laptop = sequelize.define('laptops', {
  latop_id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  latop_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latop_sku: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latop_disctiption: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latop_short_disctiption: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latop_sex: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latop_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  laptop_special_point: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latop_attr: {
    type: DataTypes.STRING,
    allowNull: true
  } ,
  latop_tag: {
    type: DataTypes.STRING,
    allowNull: true
  } ,
  order_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  laptop_size_inch: {
    type: DataTypes.STRING,
    allowNull: true
  },
  suggest_product: {
    type: DataTypes.STRING,
    allowNull: true
  },
  attach_prd: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latop_cpu: {
    type: DataTypes.STRING,
    allowNull: true
  } ,
  latop_cpu_generation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latop_laptop_demand: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latop_serieslaptop: {
    type: DataTypes.STRING,
    allowNull: true
  }, 
  latop_image_present: {
    type: DataTypes.STRING,
    allowNull: true
  }, 
  laptop_hard_disk: {
    type: DataTypes.STRING,
    allowNull: true
  }, 
  laptop_capcity: {
    type: DataTypes.STRING,
    allowNull: true
  }  

  }
//   ,{ 
//     createdAt: "created_at",
//     updatedAt: "updated_at"
// }
);

sequelize.sync().then(() => {
  console.log('Image table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = Laptop;
