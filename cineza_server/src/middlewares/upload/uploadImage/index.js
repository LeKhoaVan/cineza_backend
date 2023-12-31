const multer = require("multer");
const path = require("path");

//address folder save
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
	  // Lấy đường dẫn thư mục làm việc hiện tại (current working directory)
	const currentWorkingDir = process.cwd();

	// Nối thêm đường dẫn tương đối đến thư mục ./src/public/img
	const imgDir = path.join(currentWorkingDir, 'public', 'img');
    cb(null, imgDir);
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
  "poster"
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
