'use strict';
const Ram = require('../models/ram.model');

exports.getAllRam = async (req, res) => {
  try {
    
  const data = await Ram.findAll();
  res.status(200).json(data);
  } catch (error) {
  res.status(500).json({ error: 'Failed to retrieve laptop' });
  }
};

