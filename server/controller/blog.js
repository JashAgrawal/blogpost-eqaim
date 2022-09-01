const converter = require("../helper");
const blogModel = require("../models/blog");

class blogController {
  getAllBlogs = async (req, res, next) => {
    return res.json(await blogModel.find());
  };
  getBlogById = async (req, res, next) => {
    res.json(await blogModel.findById(req.params.blogId));
  };
  createBlog = async (req, res, next) => {
    let data = converter(req.body.content);
    const blog = new blogModel({
      title: req.body.title,
      content: data,
    });
    res.json(await blog.save());
  };
  updateBlog = async (req, res, next) => {
    await blogModel.findByIdAndUpdate(req.params.blogId, {
      title: req.body.title,
      content: req.body.content,
    });
    res.json({
      message: "update success",
    });
  };
  uploadImage = async (req, res, next) => {
    console.log(req.file);
    res.json({ url: `http://localhost:8080/files/${req.file.filename}` });
  };
}

module.exports = new blogController();
