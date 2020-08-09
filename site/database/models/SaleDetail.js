export default (sequelize, dataTypes) => {
  const SaleDetail = sequelize.define('SaleDetail', {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    saleId: {
      type: dataTypes.INTEGER(11),
      allowNull: false
    },
    productId: {
      type: dataTypes.INTEGER(11),
      allowNull: false
    },
    amount: {
      type: dataTypes.DOUBLE,
      allowNull: false
    },
    price: {
      type: dataTypes.DOUBLE,
      allowNull: false
    },
    discount: {
      type: dataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    timestamps: false
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
