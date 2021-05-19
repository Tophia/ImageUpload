const express = require('express');
const app = express();
const multer = require('multer');
// const upload = multer({dest:'uploads/'}).single("demo_image");
// var upload = multer({ storage: storage, limits : {fileSize : 1000000} }).single("demo_image");
const upload = multer({
    storage: storage,
    limits : {fileSize : 3000000}
},
function fileFilter (req, file, cb) {    
    // Allowed ext
     const filetypes = /jpeg|jpg|png|gif/;
  
   // Check ext
    const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
   // Check mime
   const mimetype = filetypes.test(file.mimetype);
  
   if(mimetype && extname){
       return cb(null,true);
   } else {
       cb('Error: Images Only!');
   }
  });
var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './uploads');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    }
 });
app.get('/', (req, res) => {  
   res.send('hello world');
});
app.post("/image", (req, res) => {
    var upload = multer({ storage:storage}).single('userPhoto');
  upload(req,res,function(err){   
      console.log(req.file);
      if(err){
        res.json({success:false,message:err});
      }
      else{
        res.json({success:true,message:"Photo was updated !"});
      } 
  });
 });
app.listen(3000, () => { 
    console.log('Started on port 3000');
});