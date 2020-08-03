export default (sequelize, dataTypes) => {
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
    userAdmin: dataTypes.BOOLEAN
  }, {
    timestamps: false
  })

  User.associate = models => {
    User.hasMany(models.Sale, {
      as: 'sales',
      foreignKey: 'userId'
    })
  }

  return User
}
