const Image = require('../models/imagesModel');

exports.insertBulkImage = async (data,folder, res) => {
    try {       
     // const images = await Image.bulkCreate(req.body);
      var values = [];
      let l = data.length
      if(l > 0){        
        for(let i=0; i< l; i++){
          values.push({img_name: data[i],img_type:folder})
        }
      }
      const images = await Image.bulkCreate(values);
      
      res.status(201).send({ message: 'successfully', more_image:data });
      //res.status(201).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to insert users',message: 'Can not save' });
    }
  };

  // Find all users
exports.getAllImages = async (req, res) => {

  try {
    var data =[]
    const  {type} = req.params
   
    if(type !=undefined){
     data = await Image.findAll({where:{img_type: type}});
    }else{
       data = await Image.findAll();
    }
      
      res.status(200).json(data);
  } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
  }
};


