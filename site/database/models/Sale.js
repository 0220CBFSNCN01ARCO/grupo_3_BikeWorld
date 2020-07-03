module.exports = (sequelize, dataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: dataTypes.DATE,
    usuario_id: dataTypes.INTEGER(11)
  }, {
    timestamps: false,
    tableName: 'ventas'
  })

  Sale.associate = models => {
    Sale.hasMany(models.SaleDetail, {
      as: 'saleDetails',
      foreignKey: 'venta_id'
    })

    Sale.belonsTo(models.User, {
      as: 'user',
      foreignKey: 'usuario_id'
    })
  }

  return Sale
}
