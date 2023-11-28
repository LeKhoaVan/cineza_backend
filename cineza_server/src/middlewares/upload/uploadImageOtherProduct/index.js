const multer = require("multer");
const path = require("path");

//address folder save
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/imgOtherProduct");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

//filer file
const imagleFiler = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = "onle image files are allowed";
    return cb(new Error("onle image files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imagleFiler }).single(
  "other_product"
);

//hand error upload single file
const handUploadFile = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.send(err);
    } else if (err) {
      res.send(err);
    } else {
      next();
    }
  });
};

module.exports = {
  handUploadFile,
};
