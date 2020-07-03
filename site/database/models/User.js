module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: dataTypes.STRING(100),
    apellido: dataTypes.STRING(100),
    email: dataTypes.STRING(100),
    password: dataTypes.STRING(200),
    categoriaUsuario_id: dataTypes.INTEGER(11)
  }, {
    timestamps: false,
    tableName: 'usuarios'
  })

  User.associate = models => {
    User.hasMany(models.Sale, {
      as: 'sales',
      foreignKey: 'usuario_id'
    })

    User.belongsTo(models.UserCategory, {
      as: 'user',
      foreignKey: 'categoriaUsuario_id'
    })
  }

  return User
}
