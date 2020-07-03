module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: dataTypes.STRING(100),
    lastName: dataTypes.STRING(100),
    email: dataTypes.STRING(100),
    password: dataTypes.STRING(200),
    userCategoryId: dataTypes.INTEGER(11)
  }, {
    timestamps: false
  })

  User.associate = models => {
    User.hasMany(models.Sale, {
      as: 'sales',
      foreignKey: 'userId'
    })

    User.belongsTo(models.UserCategory, {
      as: 'user',
      foreignKey: 'userCategoryId'
    })
  }

  return User
}
