module.exports = (sequelize, dataTypes) => {
  const UserCategory = sequelize.define('UserCategory', {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: dataTypes.STRING(100)
  }, {
    timestamps: false
  })

  UserCategory.associate = models => {
    UserCategory.hasMany(models.User, {
      as: 'users',
      foreignKey: 'userCategoryId'
    })
  }

  return UserCategory
}
