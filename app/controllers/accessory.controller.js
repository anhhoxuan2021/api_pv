'use strict';
const Accessory = require('../models/accessory.model');
const Attribute = require('../models/acc_attribute.model')

            // Create a new Accessory
exports.createAccessory = async (req, res) => {
  const {dataAccessory, attributes} = req.body
    try {

     const accessory = await Accessory.create(dataAccessory);
     
     if (attributes && attributes.length > 0) {
        const attrs = attributes.map(attr => ({
          ...attr, 
          accessory_id: accessory.accessory_id
        }));
        await Attribute.bulkCreate(attrs);
      }
  
     // res.status(201).json({ laptop, attrs: await user.getPosts() });
      res.status(201).json(accessory);
      } catch (error) {
        res.status(500).json(error);
      }    
  };

                  // Update a accessory and their attrs
  exports.updateAccessory =async (req,res) => {
    const {dataAccessory, attributes} = req.body

    try {
      const existing = await Accessory.findByPk(dataAccessory.accessory_id);
      if (existing) {
        await existing.update(dataAccessory);
      }
  
      
      if (attributes && Array.isArray(attributes)) {
        //delete attributes
        await Attribute.destroy({
          where: {
            accessory_id: dataAccessory.accessory_id
          }
        });
          //create attributes
        const attrs = attributes.map(attr => ({
          ...attr, 
          accessory_id: dataAccessory.accessory_id
        }));
        await Attribute.bulkCreate(attrs);
      }
  
      res.status(200).send({ message: 'accessory and attributes updated successfully' });
      } catch (error) {
      console.error('Error updating Product and attributes:', error);
      res.status(500).send({ message: 'An error occurred while updating' });
      }
    }

        
                 /////get product by id
  exports.getAccessoryByID =async (req,res) => {
    try {
      const accessory = await Accessory.findByPk(req.params.id, {
        include: [{ model: Attribute, as: 'accs_attrs' }]
      });
      if (!accessory) {
        return res.status(404).json({ message: 'accessory not found' });
      }
      res.json(accessory);
      } catch (error) {
      res.status(500).json({ error: error.message });
      }

  }

               /////get products
exports.getAllAccessories= async (req, res) => {
  try {
    const data = await Accessory.findAll( {
      include: [{ model: Attribute, as: 'accs_attrs'}],
    });
    if (!data) {
      return res.status(404).json({ message: 'Accessory not found' });
    }
    res.json(data);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

            /////get  limit products
  exports.getLimitAccessories =async (req,res) => {
    const {limit, type} = req.params
    const limit1 = parseInt(limit);
    try {
      const acc = await Accessory.findAll( {
       // where:{p_demand: type},
        include: [{ model: Attribute, as: 'accs_attrs',limit: 1 }],
        limit:limit1,
        order: [['accs_attr_id', 'DESC']], 
      });
      if (!acc) {
        return res.status(404).json({ message: 'Accessory not found' });
      }
      res.json(acc);
      } catch (error) {
      res.status(500).json({ error: error.message });
      }

  }

                // paginated 
 exports.AccessiesPagination = async (req, res) => {
  try {
   const {page, pageSize} = req.params
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;

    const { count, rows: acc } = await Accessory.findAndCountAll( {
      include: [{ 
        model: Attribute, 
        as: 'accs_attrs',
        //attributes: ['id', 'title', 'content'],
       }],

      distinct: true, 
      limit,
      offset,
      order: [['accessory_id', 'DESC']], 
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      // currentPage: parseInt(page),
      // pageSize: limit,
      data: acc
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};



