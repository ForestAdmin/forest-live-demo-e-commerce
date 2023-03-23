const { collection } = require('forest-express-sequelize');

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('customerIssue', {
  actions: [{
    name: 'Issue solved'
  }, {
    name: 'Create support',
    type: 'single',
    fields: [{
      field: 'type',
      type: 'Enum',
      enums: ['email', 'phone', 'chat'],
      isRequired: true,
    }, {
      field: 'description',
      type: 'String',
      isRequired: true,
      widget: 'text area',
    }]
  }],
  fields: [],
  segments: [],
});
