const Laptop = require('../models/laptop.model');
const Attribute = require('../models/attribute.model')

// Create a new Laptop
exports.createLaptop = async (req, res) => {
  const {dataLaptop, attributes} = req.body
    try {
        //  const {
        //   latop_name,
        //     latop_sku,       
        //     laptop_special_point,
        //     latop_disctiption,
        //     latop_type,
        //     // latop_attr,
        //     // latop_tag,
        //     order_code,
        //     prod_size_inch,
        //     prd_batch_code,
        //     laptop_size_inch,
        //     suggest_product,
        //     attach_prd,
        //     latop_cpu,
        //     latop_cpu_generation,
        //     latop_laptop_demand,
        //     latop_serieslaptop,
        //     latop_image_present
        // } = req.body

        // const attributes = {attrs} = req.body
        
      //  console.log(req.body.latop_name)
        
        let data1 = {
            latop_name:req.body.latop_name,
            latop_sku:req.body.latop_sku,       
            laptop_special_point:req.body.laptop_special_point,
            latop_disctiption: req.body.latop_disctiption,
            latop_type: req.body.latop_type,
           // latop_attr:req.body.latop_attr,
            //latop_tag:req.body.latop_tag,
            order_code: req.body.order_code,
            prod_size_inch: req.body.prod_size_inch,
            //prd_batch_code: req.body.prd_batch_code,
            laptop_size_inch: req.body.laptop_size_inch,
            // suggest_product: req.body.suggest_product,
            // attach_prd: req.body.attach_prd,
            latop_cpu: req.body.latop_cpu,
            latop_cpu_generation: req.body.latop_cpu_generation,
            latop_laptop_demand: req.body.latop_laptop_demand,
            latop_serieslaptop: req.body.latop_serieslaptop
        }

     const laptop = await Laptop.create(dataLaptop);
     
     if (attributes && attributes.length > 0) {
        const laptopAttrs = attributes.map(attr => ({
          ...attr, 
          latop_id: laptop.latop_id
        }));
        await Attribute.bulkCreate(laptopAttrs);
      }
  
     // res.status(201).json({ laptop, attrs: await user.getPosts() });
      res.status(201).json(laptop);
      } catch (error) {
        res.status(500).json(error);
      }    
  };
  /////get laptop by id
  exports.getLaptopByID =async (req,res) => {
    try {
      const laptop = await Laptop.findByPk(req.params.id, {
        include: [{ model: Attribute, as: 'attributes' }]
      });
      if (!laptop) {
        return res.status(404).json({ message: 'laptop not found' });
      }
      res.json(laptop);
      } catch (error) {
      res.status(500).json({ error: error.message });
      }

  }

    /////get laptops
    exports.getLaptops =async (req,res) => {
      try {
        const laptop = await Laptop.findAll( {
          include: [{ model: Attribute, as: 'attributes'}],
        });
        if (!laptop) {
          return res.status(404).json({ message: 'laptop not found' });
        }
        res.json(laptop);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
  
    }

    /////get  limit laptops
    exports.getLimitLaptops =async (req,res) => {
      const {limit, type} = req.params
      const limit1 = parseInt(limit);
      try {
        const laptop = await Laptop.findAll( {
          where:{latop_laptop_demand: type},
          include: [{ model: Attribute, as: 'attributes',limit: 1 }],
          limit:limit1,
          order: [['latop_id', 'DESC']], 
        });
        if (!laptop) {
          return res.status(404).json({ message: 'laptop not found' });
        }
        res.json(laptop);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
  
    }


    // Update a laptop and their attrs
    exports.updateLaptop =async (req,res) => {
      const {dataLaptop, attributes} = req.body

      try {
        const existingLaptop = await Laptop.findByPk(dataLaptop.latop_id);
        if (existingLaptop) {
          await existingLaptop.update(dataLaptop);
        }
    
       
        if (attributes && Array.isArray(attributes)) {
          //delete attributes
          await Attribute.destroy({
            where: {
              latop_id: dataLaptop.latop_id
            }
          });
           //create attributes
          const laptopAttrs = attributes.map(attr => ({
            ...attr, 
            latop_id: dataLaptop.latop_id
          }));
          await Attribute.bulkCreate(laptopAttrs);
        }
    
        res.status(200).send({ message: 'Laptop and attributes updated successfully' });
        } catch (error) {
        console.error('Error updating Laptop and attributes:', error);
        res.status(500).send({ message: 'An error occurred while updating' });
        }
      }

// Controller function for getting paginated 
 exports.getLaptopUseLimitOffest = async (req, res) => {
  try {
   // const { page = 1, pageSize = 2 } = req.query; // Default values
   const {page, pageSize} = req.params
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;

    const { count, rows: laptop } = await Laptop.findAndCountAll( {
      include: [{ 
        model: Attribute, 
        as: 'attributes',
        //attributes: ['id', 'title', 'content'],
       }],

      distinct: true, 
      limit,
      offset,
      order: [['latop_id', 'DESC']], 
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      // currentPage: parseInt(page),
      // pageSize: limit,
      data: laptop
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


    
 




