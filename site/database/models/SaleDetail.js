module.exports = (sequelize, dataTypes) => {
  const SaleDetail = sequelize.define('SaleDetail', {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    venta_id: dataTypes.INTEGER(11),
    producto_id: dataTypes.INTEGER(11),
    cantidad: dataTypes.DOUBLE,
    precio: dataTypes.DOUBLE,
    descuento: dataTypes.DOUBLE
  }, {
    timestamps: false,
    tableName: 'ventadetalles'
  })

  SaleDetail.associate = models => {
    SaleDetail.belongsTo(models.Sale, {
      as: 'sale',
      foreignKey: 'venta_id'
    })

    SaleDetail.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'producto_id'
    })
  }

  return SaleDetail
}
