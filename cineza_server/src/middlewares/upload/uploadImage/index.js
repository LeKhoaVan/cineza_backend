const multer = require("multer");
const path = require("path");

// Đường dẫn thư mục để lưu trữ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Sử dụng đường dẫn đầy đủ tới thư mục
    const destinationPath = path.join(__dirname, "public", "img");
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Bộ lọc file
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = "Only image files are allowed";
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

// Khởi tạo middleware multer với cấu hình lưu trữ và bộ lọc
const upload = multer({ storage: storage, fileFilter: imageFilter }).single(
  "poster"
);

// Xử lý lỗi upload file
const handleUploadFile = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(500).json({ error: err.message });
    } else if (err) {
      res.status(500).json({ error: err.message });
    } else {
      next();
    }
  });
};

module.exports = {
  handleUploadFile,
};
