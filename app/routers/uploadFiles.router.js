const router = require("express").Router();
const uploadFiles = require('../middleware/multerConfigFiles');
const imgControler = require("../controllers/imageController");



 /****************multi fields is file************** */ 
router.post("/files-upload", uploadFiles.fields([
  { name: "more_imgs", maxCount: 5 }   
]), (req, res) => {
  try {
  const multipleFiles = req.files["more_imgs"] || [];
  var more_image =''
  var data =[]
  if(multipleFiles !=''){
    for(let x of multipleFiles){
     // more_image = more_image==''? x.filename:more_image+','+x.filename
      data.push(x.filename)
    }
    
    //imgControler.saveImgPath(data, req.body.folder,res)
    imgControler.insertBulkImage(data, req.body.folder,res)
  }else{
    return res.json({
      message: "No file upload",
      more_image:''
    });
  }


} catch (err) {
  res.status(500).json({ message: "Error uploading files" });
}
});

////////////////////////////////
router.get("/get-all-images", imgControler.getAllImages);
router.get("/get-all-images/:type", imgControler.getAllImages);


module.exports = router;
