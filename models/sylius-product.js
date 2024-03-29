// This model was generated by Forest CLI. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const SyliusProduct = sequelize.define('syliusProduct', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('available','out-of-stock'),
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'sylius_product',
    underscored: true,
    timestamps: false,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/reference-guide/relationships#adding-relationships.
  SyliusProduct.associate = (models) => {
    SyliusProduct.belongsToMany(models.syliusTaxon, {
      through: 'syliusProductTaxon',
      foreignKey: 'product_id',
      otherKey: 'taxon_id',
      as: 'syliusTaxonThroughSyliusProductTaxons',
    });
    SyliusProduct.hasMany(models.storageUnit, {
      foreignKey: {
        name: 'productIdKey',
        field: 'product_id',
      },
      as: 'productStorageUnits',
    });
    SyliusProduct.hasMany(models.syliusOrderItem, {
      foreignKey: {
        name: 'productIdKey',
        field: 'product_id',
      },
      as: 'productSyliusOrderItems',
    });
    SyliusProduct.hasMany(models.syliusProductVariant, {
      foreignKey: {
        name: 'productIdKey',
        field: 'product_id',
      },
      as: 'productSyliusProductVariants',
    });
  };

  return SyliusProduct;
};
