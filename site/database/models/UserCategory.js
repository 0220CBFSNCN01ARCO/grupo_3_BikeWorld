module.exports = (sequelize, dataTypes) => {
  const UserCategory = sequelize.define('UserCategory', {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: dataTypes.STRING(100)
  }, {
    timestamps: false,
    tableName: 'categoriausuarios'
  })

  UserCategory.associate = models => {
    UserCategory.hasMany(models.User, {
      as: 'users',
      foreignKey: 'usuarioCategoria_id'
    })
  }

  return UserCategory
}
