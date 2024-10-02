 'use strict';
  const router = require("express").Router();
  const uploadFile = require('../middleware/multerConfigure');
  const userController = require("../controllers/user.controller");

// Set up a POST route to handle file upload
router.post('/save_avatar', uploadFile.single('avatar'), (req, res) => {
  try {
    if (!req.file) {
      return userController.create(req,res)
     // return res.status(400).json({ message: 'No file uploaded' });
    }else{
      const { originalname, mimetype, size, filename } = req.file;
//         //delete req.body.avatar
        req.body.avatar = filename
        if(req.body?.id != undefined && req.body?.id != ''){
         //update
        }else{          
          return  userController.createUser(req,res)
        }
    }
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

  