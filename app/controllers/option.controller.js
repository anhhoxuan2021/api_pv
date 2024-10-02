const Ram = require('../models/ram.model');
const Zise = require('../models/size.model');
const Color = require('../models/color.model');
const CPU = require('../models/cpu.model');
const CPUGenerate = require('../models/cpuGenerate.model');
const Demands = require('../models/laptop_demand.model');
const SeriesLaptop = require('../models/serieslaptop.model');
const ProductType = require('../models/productType.model');
const Harddisk = require('../models/hard_disk.model');

// Get data from multiple tables simultaneously
exports.getOptionType = async (req, res) => {
  try {
    // Fetch users and posts simultaneously
    const [colors, sizes, cpus, cpu_generates, laptops, product_types, rams, series, harddisk ] = await Promise.all([
      Color.findAll(),
      Zise.findAll(),
      CPU.findAll(),
      CPUGenerate.findAll(),
      Demands.findAll(),
      ProductType.findAll(),
      Ram.findAll(),
      SeriesLaptop.findAll(),
      Harddisk.findAll(),
    ]);
    
    res.status(200).json({ colors, sizes, cpus, cpu_generates, laptops, product_types, rams, series, harddisk});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
};
