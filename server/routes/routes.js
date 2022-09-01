const router = require("express").Router();
const blogController = require("../controller/blog");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `./uploads/`);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
router.get("/blogs", blogController.getAllBlogs);
router.post("/addBlog", blogController.createBlog);
router.get("/blog/:blogId", blogController.getBlogById);
router.post("/updateblog/:blogId", blogController.updateBlog);
router.post("/uploadImage", upload.single("file"), blogController.uploadImage);

module.exports = router;
