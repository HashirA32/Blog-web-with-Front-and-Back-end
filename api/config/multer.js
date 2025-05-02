import multer from "multer";
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);  // Accept the file
  } else {
    cb(new Error("Only image files are allowed"), false);  // Reject the file
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload
