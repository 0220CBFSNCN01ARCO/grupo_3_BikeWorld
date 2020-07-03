module.exports = (sequelize, dataTypes) => {
  const SaleDetail = sequelize.define('SaleDetail', {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    saleId: dataTypes.INTEGER(11),
    productId: dataTypes.INTEGER(11),
    amount: dataTypes.DOUBLE,
    price: dataTypes.DOUBLE,
    discount: dataTypes.DOUBLE
  }, {
    timestamps: false,
  })

  SaleDetail.associate = models => {
    SaleDetail.belongsTo(models.Sale, {
      as: 'sale',
      foreignKey: 'saleId'
    })

    SaleDetail.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'productId'
    })
  }

  return SaleDetail
}
