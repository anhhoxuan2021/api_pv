'use strict';
const Product = require('../models/product.model');
const P_Attribute = require('../models/p_attribute.model')

            // Create a new Product
exports.createProduct = async (req, res) => {
  const {dataProduct, attributes} = req.body
    try {

     const product = await Product.create(dataProduct);
     
     if (attributes && attributes.length > 0) {
        const prdAttrs = attributes.map(attr => ({
          ...attr, 
          p_id: product.p_id
        }));
        await P_Attribute.bulkCreate(prdAttrs);
      }
  
     // res.status(201).json({ Product, attrs: await user.getPosts() });
      res.status(201).json(product);
      } catch (error) {
        res.status(500).json(error);
      }    
  };

                  // Update a product and their attrs
  exports.updateProduct =async (req,res) => {
    const {dataProduct, attributes} = req.body

    try {
      const existing = await Product.findByPk(dataProduct.p_id);
      if (existing) {
        await existing.update(dataProduct);
      }
  
      
      if (attributes && Array.isArray(attributes)) {
        //delete attributes
        await P_Attribute.destroy({
          where: {
            p_id: dataProduct.p_id
          }
        });
          //create attributes
        const attrs = attributes.map(attr => ({
          ...attr, 
          p_id: dataProduct.p_id
        }));
        await P_Attribute.bulkCreate(attrs);
      }
  
      res.status(200).send({ message: 'Product and attributes updated successfully' });
      } catch (error) {
      console.error('Error updating Product and attributes:', error);
      res.status(500).send({ message: 'An error occurred while updating' });
      }
    }

        
                 /////get product by id
  exports.getProductByID =async (req,res) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [{ model: P_Attribute, as: 'product_attrs' }]
      });
      if (!product) {
        return res.status(404).json({ message: 'product not found' });
      }
      res.json(product);
      } catch (error) {
      res.status(500).json({ error: error.message });
      }

  }

               /////get products
exports.getAllProducts = async (req, res) => {
  try {
    const data = await Product.findAll( {
      include: [{ model: P_Attribute, as: 'product_attrs'}],
    });
    if (!data) {
      return res.status(404).json({ message: 'product not found' });
    }
    res.json(data);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

            /////get  limit products
  exports.getLimitProducts=async (req,res) => {
    const {limit} = req.params
    const limit1 = parseInt(limit);
    try {
      const prod = await Product.findAll( {
       // where:{p_demand: type},
        include: [{ model: P_Attribute, as: 'product_attrs',limit: 1 }],
        limit:limit1,
        order: [['p_id', 'DESC']], 
      });
      if (!prod) {
        return res.status(404).json({ message: 'product not found' });
      }
      res.json(prod);
      } catch (error) {
      res.status(500).json({ error: error.message });
      }

  }

                // paginated 
 exports.ProductPagination = async (req, res) => {
  try {
   const {page, pageSize} = req.params
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;

    const { count, rows: product } = await Product.findAndCountAll( {
      include: [{ 
        model: P_Attribute, 
        as: 'attributes',
        //attributes: ['id', 'title', 'content'],
       }],

      distinct: true, 
      limit,
      offset,
      order: [['p_id', 'DESC']], 
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      // currentPage: parseInt(page),
      // pageSize: limit,
      data: product
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};



