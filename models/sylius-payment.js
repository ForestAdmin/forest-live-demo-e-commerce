// This model was generated by Forest CLI. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const SyliusPayment = sequelize.define('syliusPayment', {
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'sylius_payment',
    underscored: true,
    timestamps: false,
  });

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/reference-guide/relationships#adding-relationships.
  SyliusPayment.associate = (models) => {
    SyliusPayment.belongsTo(models.syliusOrder, {
      foreignKey: {
        name: 'orderIdKey',
        field: 'order_id',
      },
      as: 'order',
    });
    SyliusPayment.belongsTo(models.syliusPaymentMethod, {
      foreignKey: {
        name: 'methodIdKey',
        field: 'method_id',
      },
      as: 'method',
    });
  };

  return SyliusPayment;
};
