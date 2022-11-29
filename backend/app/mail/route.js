const express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");
const {
  handlerPostMail,
  handlerGetSentMail,
  handlerGetInboxMail,
  handlerGetSentById,
  handlerGetInboxById,
  handlerGetImage,
} = require("./handler");
const router = express.Router();
const multer = require("multer");

const supportType = ["image/jpeg", "image/png","image/jpg"];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    if (!supportType.includes(file.mimetype)) {
      cb(new Error("File type not supported"), null);
      return;
    }
    cb(
      null,
       "image-"+  Date.now() + "-" + file.originalname
    );
  },
});
const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 5000 * 1024,
  },
});

router.get("/sent", authenticationToken, handlerGetSentMail);
router.get("/sent/:id", authenticationToken, handlerGetSentById);
router.get("/inbox", authenticationToken, handlerGetInboxMail);
router.get("/inbox/:id", authenticationToken, handlerGetInboxById);
router.post("/sendmail", authenticationToken, uploadImage.single("Image"), handlerPostMail);

module.exports = router;
