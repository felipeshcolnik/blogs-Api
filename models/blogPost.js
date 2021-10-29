const BlogPost = (sequelize, DataTypes) => { 
  const blogpost = sequelize.define('BlogPost', {
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER }, 
    published: { type: DataTypes.DATE },
    updated: { type: DataTypes.DATE },
  }, { timestamps: false });

  blogpost.associate = (models) => {
    blogpost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return blogpost;
};

module.exports = BlogPost;