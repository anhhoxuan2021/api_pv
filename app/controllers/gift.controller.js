'use strict';
const Gift = require('../models/accessory.model');
const Attribute = require('../models/gift_attribute.model')

            // Create a new Gift
exports.createGift = async (req, res) => {
  const {dataGift, attributes} = req.body
    try {

     const gift = await Gift.create(dataGift);
     
     if (attributes && attributes.length > 0) {
        const attrs = attributes.map(attr => ({
          ...attr, 
          gift_attr_id: gift.gift_id
        }));
        await Attribute.bulkCreate(attrs);
      }
  
     // res.status(201).json({ laptop, attrs: await user.getPosts() });
      res.status(201).json(gift);
      } catch (error) {
        res.status(500).json(error);
      }    
  };

                  // Update a Gift and their attrs
  exports.updateGift =async (req,res) => {
    const {dataGift, attributes} = req.body

    try {
      const existing = await Gift.findByPk(dataGift.gift_id);
      if (existing) {
        await existing.update(dataGift);
      }
  
      
      if (attributes && Array.isArray(attributes)) {
        //delete attributes
        await Attribute.destroy({
          where: {
            gift_attr_id: dataGift.gift_id
          }
        });
          //create attributes
        const attrs = attributes.map(attr => ({
          ...attr, 
          gift_attr_id: dataGift.gift_id
        }));
        await Attribute.bulkCreate(attrs);
      }
  
      res.status(200).send({ message: 'accessory and Gift updated successfully' });
      } catch (error) {
      console.error('Error updating Product and Gift:', error);
      res.status(500).send({ message: 'An error occurred while updating' });
      }
    }

        
                 /////get Gift by id
  exports.getGiftID =async (req,res) => {
    try {
      const gift = await Gift.findByPk(req.params.id, {
        include: [{ model: Attribute, as: 'gift_attrs' }]
      });
      if (!gift) {
        return res.status(404).json({ message: 'Gift not found' });
      }
      res.json(gift);
      } catch (error) {
      res.status(500).json({ error: error.message });
      }

  }

               /////get gifts
exports.getAllGifts= async (req, res) => {
  try {
    const data = await Gift.findAll( {
      include: [{ model: Attribute, as: 'gift_attrs'}],
    });
    if (!data) {
      return res.status(404).json({ message: 'Gift not found' });
    }
    res.json(data);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

            /////get  limit Gifts
  exports.getLimitGifts =async (req,res) => {
    const {limit, type} = req.params
    const limit1 = parseInt(limit);
    try {
      const gift = await Gift.findAll( {
       // where:{p_demand: type},
        include: [{ model: Attribute, as: 'gift_attrs',limit: 1 }],
        limit:limit1,
        order: [['gift_id', 'DESC']], 
      });
      if (!gift) {
        return res.status(404).json({ message: 'Gift not found' });
      }
      res.json(gift);
      } catch (error) {
      res.status(500).json({ error: error.message });
      }

  }

                // paginated 
 exports.GiftsPagination = async (req, res) => {
  try {
   const {page, pageSize} = req.params
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;

    const { count, rows: gift } = await Gift.findAndCountAll( {
      include: [{ 
        model: Attribute, 
        as: 'gift_attrs',
        //attributes: ['id', 'title', 'content'],
       }],

      distinct: true, 
      limit,
      offset,
      order: [['gift_id', 'DESC']], 
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      // currentPage: parseInt(page),
      // pageSize: limit,
      data: gift
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};



