module.exports = (sequelize, dataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: dataTypes.DATE,
    userId: dataTypes.INTEGER(11)
  }, {
    timestamps: false
  })

  Sale.associate = models => {
    Sale.hasMany(models.SaleDetail, {
      as: 'saleDetails',
      foreignKey: 'saleId'
    })

    Sale.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    })
  }

  return Sale
}
