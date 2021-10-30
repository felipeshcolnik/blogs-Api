const { Op } = require('sequelize'); 

const { in: opIn } = Op;

const { BlogPost, Category, User } = require('../../models');
const validateFcts = require('../utils/validateFunctions');
const error = require('../utils/errorsObject');

const createPost = async (title, categoryIds, content, userId) => {
  validateFcts.validatePost({ title, categoryIds, content });
  const categoryIdExists = await Category.findAll({ where: { id: { [opIn]: categoryIds } } });
  if (!categoryIdExists.length) throw error.categoryNotFound;
  const result = await BlogPost.create({ title, content, userId });
  const newPost = await BlogPost.findByPk(result.id);
  categoryIds.forEach(async (id) => {
    const cat = await Category.findByPk(id);
    newPost.addCategory(cat);
  });
  return result;
};

const getAllPosts = async () => {
  const result = await BlogPost.findAll({ 
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

const getPostById = async (id) => {
  const result = await BlogPost.findByPk(id, { 
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!result) throw error.postDoesNotExist;
  return result;
};

const editPost = async (postId, body, userId) => {
  if (body.categoryIds || body.categoryIds === '') throw error.categoriesNotEdited;
  const { title, content } = body;
  validateFcts.EditPostParams({ id: postId, title, content });
  const post = await BlogPost.findOne({ where: { id: postId } });
  if (post.userId !== userId) throw error.unauthorizedUser;
  await BlogPost.update({ title, content, categories: post.categories }, { where: { id: postId } });
  const result = await BlogPost.findOne(
    { where: { id: postId },
    include: { model: Category, as: 'categories', through: { attributes: [] } },
    },
  );
  return result;
};

const deletePost = async (postId, userId) => {
  const post = await BlogPost.findOne({ where: { id: postId } });
  if (!post) throw error.postDoesNotExist;
  if (post.userId !== userId) throw error.unauthorizedUser;
  await BlogPost.destroy({ where: { id: postId } });
  return true;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
};