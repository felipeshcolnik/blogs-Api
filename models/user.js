const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { 
    timestamps: false,
  });
  user.associate = (models) => {
    user.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'post',
    });
  };

  return user;
};

module.exports = User;