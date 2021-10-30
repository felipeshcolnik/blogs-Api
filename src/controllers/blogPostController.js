const blogPostService = require('../services/blogPostService');

const createPost = async (req, res) => {
  const { title, categoryIds, content } = req.body;
  const userId = req.user.id;
  const result = await blogPostService.createPost(title, categoryIds, content, userId);
  return res.status(201).json(result);
};

const getAllPosts = async (req, res) => {
  const result = await blogPostService.getAllPosts();
  return res.status(200).json(result);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const result = await blogPostService.getPostById(id);
  return res.status(200).json(result);
};

const editPost = async (req, res) => {  
  const { id } = req.params;  
  const userId = req.user.id;
  const result = await blogPostService.editPost(id, req.body, userId);
  return res.status(200).json(result);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
};