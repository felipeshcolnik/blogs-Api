const PostCategory = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('PostsCategory', {},
   { timestamps: false, tablename: 'PostsCategories' });
  
  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPosts',
      through: postCategory,
      foreignKey: 'categoryId', 
      otherKey: 'postId',
    });
  };
  return postCategory;
};

module.exports = PostCategory;