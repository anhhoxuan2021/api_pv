'use strict';
module.exports = function (router) {
  const multer = require('multer');
  const path = require('path');
  const userController = require("../controllers/user.controller");

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/user/');
    },
    filename: (req, file, cb) => {
     cb(null, `${file.fieldname}${path.extname(file.originalname)}`);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // Reject files with a mimetype other than 'image/png' or 'image/jpeg'
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Only PNG and JPEG files are allowed'), false);
    }
  };

  // fileFilter: (req, file, cb) => {
  //   const fileTypes = /jpeg|jpg|png|pdf/; // Allowed file types
  //   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  //   const mimetype = fileTypes.test(file.mimetype);
    
  //   if (mimetype && extname) {
  //     return cb(null, true);
  //   } else {
  //     cb(new Error('Invalid file type! Only JPEG, PNG, and PDF are allowed.'));
  //   }
  // }
  
  const upload = multer({ 
    storage,
    limits: {
      fileSize: 1024 * 1024 * 5 // 5MB file size limit
    },
    fileFilter
  
  });
    // Route for handling file uploads
    router.post('/save_profile', upload.single('avatar'), (req, res) => {      
       if (!req.file) {
        userController.create(req,res)
        //return res.status(400).send('No file uploaded.');
      }else{
        const { originalname, mimetype, size, filename } = req.file;
        //delete req.body.avatar
        req.body.avatar = filename
        if(req.body?.id != undefined && req.body?.id != ''){
         
        }else{          
         userController.create(req,res)
        }

  
      //  res.send(`File uploaded: ${originalname}, ${mimetype}, ${size} bytes, ${filename}`);
      }
  
    }, (err, req, res, next) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading the file
        return res.status(400).send(`Multer error: ${err.message}`);
      } else if (err) {
        // An unknown error occurred when uploading the file
        return res.status(500).send(`Unknown error: ${err.message}`);
      }
    });
    ////////////////////////////
      // Route for handling file uploads
      router.patch('/up_profile', upload.single('avatar'), (req, res) => {      
        if (!req.file) {
         userController.updateById(req,res)
         //return res.status(400).send('No file uploaded.');
       }else{
         const { originalname, mimetype, size, filename } = req.file;
         //delete req.body.avatar
         req.body.avatar = filename
         userController.updateById(req,res)
 
   
       //  res.send(`File uploaded: ${originalname}, ${mimetype}, ${size} bytes, ${filename}`);
       }
   
     }, (err, req, res, next) => {
       if (err instanceof multer.MulterError) {
         return res.status(400).send(`Multer error: ${err.message}`);
       } else if (err) {
         return res.status(500).send(`Unknown error: ${err.message}`);
       }
     });


   // Serve static files from the 'uploads' directory
   //app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    //router.post("/user", userController.create);
    router.get("/user/:id", userController.findById);
    //router.put("/user/:id", userController.updateById);
    router.get("/users", userController.getAll);
    router.delete("/user/:id", userController.removeId);
    router.get("/user/email/:email", userController.findUserByEmail);
  };
  