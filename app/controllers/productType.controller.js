const ProductType = require('../models/productType.model');
const Brand = require('../models/brand.model')

 /////get getProductTypes
 exports.getProductTypes =async (req,res) => {
    try {
      const types = await ProductType.findAll( {
        include: [{ model: Brand, as: 'brand'}],
      });
      if (!types) {
        return res.status(404).json({ message: 'types not found' });
      }
      res.json(types);
      } catch (error) {
      res.status(500).json({ error: error.message });
      }

  }

   /////get brands
 exports.getBrands =async (req,res) => {
    try {
      const brands = await Brand.findAll( {
        include: [{ model: ProductType, as: 'product_types'}],
      });
      if (!brands) {
        return res.status(404).json({ message: 'brands not found' });
      }
      res.json(brands);
      } catch (error) {
      res.status(500).json({ error: error.message });
      }

  }

  ///Create product type
  exports.createProductType = async (req, res) => {
    const {dataPType} = req.body
      try {
  
       const rsl = await ProductType.create(dataPType);
    
       // res.status(201).json({ laptop, attrs: await user.getPosts() });
        res.status(201).json(rsl);
        } catch (error) {
          res.status(500).json(error);
        }    
    };