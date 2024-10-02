//'use strict';
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/avatar/');
  },
  filename: (req, file, cb) => {
   cb(null, Date.now()+file.originalname + path.extname(file.originalname));
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

const uploadFile = multer({ 
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB file size limit
  },
  fileFilter

});

module.exports = uploadFile;

