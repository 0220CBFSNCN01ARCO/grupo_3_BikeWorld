module.exports = (sequelize, dataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: dataTypes.STRING(150),
    price: dataTypes.DOUBLE,
    discount: dataTypes.DOUBLE,
    productCategoryId: dataTypes.INTEGER(11),
    description: dataTypes.STRING(400),
    image: dataTypes.STRING(100),
    productStatusId: dataTypes.INTEGER(11)
  }, {
    timestamps: false
  })

  Product.associate = models => {
    Product.hasMany(models.saleDetail, {
      as: 'saleDetails',
      foreignKey: 'productId'
    })

    Product.belongsTo(models.ProductCategory, {
      as: 'category',
      foreignKey: 'productCategoryId'
    })

    Product.belongsTo(models.ProductStatus, {
      as: 'status',
      foreignKey: 'productStatusId'
    })
  }

  return Product
}
