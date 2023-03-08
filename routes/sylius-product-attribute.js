const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const { syliusProductAttribute } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('syliusProductAttribute');

// This file contains the logic of every route in Forest Admin for the collection syliusProductAttribute:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions

// Create a Sylius Product Attribute
router.post('/syliusProductAttribute', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Sylius Product Attribute
router.put('/syliusProductAttribute/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Sylius Product Attribute
router.delete('/syliusProductAttribute/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Sylius Product Attributes
router.get('/syliusProductAttribute', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Sylius Product Attributes
router.get('/syliusProductAttribute/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-number-of-records
  // Improve performances disabling pagination: https://docs.forestadmin.com/documentation/reference-guide/performance#disable-pagination-count
  next();
});

// Get a Sylius Product Attribute
router.get('/syliusProductAttribute/\\b(?!count\\b):recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Sylius Product Attributes
router.get('/syliusProductAttribute.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Sylius Product Attributes
router.delete('/syliusProductAttribute', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

module.exports = router;
