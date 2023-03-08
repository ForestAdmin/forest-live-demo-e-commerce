// This model was generated by Forest CLI. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const SyliusShippingMethod = sequelize.define('syliusShippingMethod', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    calculator: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  }, {
    tableName: 'sylius_shipping_method',
    timestamps: false,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/reference-guide/relationships#adding-relationships.
  SyliusShippingMethod.associate = (models) => {
    SyliusShippingMethod.hasMany(models.syliusShipping, {
      foreignKey: {
        name: 'methodIdKey',
        field: 'method_id',
      },
      as: 'methodSyliusShippings',
    });
  };

  return SyliusShippingMethod;
};
