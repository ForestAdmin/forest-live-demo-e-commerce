// This model was generated by Forest CLI. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const SyliusTaxon = sequelize.define('syliusTaxon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'sylius_taxon',
    timestamps: false,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/reference-guide/relationships#adding-relationships.
  SyliusTaxon.associate = (models) => {
    SyliusTaxon.belongsToMany(models.syliusProduct, {
      through: 'syliusProductTaxon',
      foreignKey: 'taxon_id',
      otherKey: 'product_id',
      as: 'syliusProductThroughSyliusProductTaxons',
    });
  };

  return SyliusTaxon;
};
