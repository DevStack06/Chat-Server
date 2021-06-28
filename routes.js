const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".jpg");
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
  // fileFilter: fileFilter,
});

//adding and update profile image
router.route("/addimage").patch(upload.single("img"), (req, res) => {
  try {
    return res.json({ img: req.file.filename });
  } catch (e) {
    return res.json({ error: e });
  }
});

module.exports = router;
