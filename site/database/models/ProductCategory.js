module.exports = (sequelize, dataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
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

  ProductCategory.associate = models => {
    ProductCategory.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'productCategoryId'
    })
  }

  return ProductCategory
}
