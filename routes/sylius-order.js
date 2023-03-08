const express = require('express');
const { PermissionMiddlewareCreator, RecordsGetter, RecordCreator } = require('forest-express-sequelize');
const { syliusOrder: order, customerIssue } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('syliusOrder');

// This file contains the logic of every route in Forest Admin for the collection syliusOrder:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions


/**
 * Smart Action : 'Mark as Fulfilled'
 */
router.post('/actions/mark-as-fulfilled', permissionMiddlewareCreator.smartAction(), (request, response) => {
  const recordsGetter = new RecordsGetter(order, request.user, request.query);
  recordsGetter.getIdsFromRequest(request)
    .then(orderIds => {
      order.update({ state: 'Fulfilled'}, { where: { id: orderIds }})
    })
    .then(() => response.send({ success: 'Order is now fulfilled' }))
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: 'An error as occured' });
    })
});

/**
 * Smart Action : 'Payment issue'
 */
router.post('/actions/payment-issue', permissionMiddlewareCreator.smartAction(), (request, response) => {
  createCustomerIssue('payment', request, response);
});

/**
 * Smart Action : 'Shipping issue'
 */
router.post('/actions/shipping-issue', permissionMiddlewareCreator.smartAction(), (request, response) => {
  createCustomerIssue('shipping', request, response);
});

/**
 * Smart Action : 'Return issue'
 */
router.post('/actions/return-issue', permissionMiddlewareCreator.smartAction(), (request, response) => {
  createCustomerIssue('return', request, response);
});


// Create a Sylius Order
router.post('/syliusOrder', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Sylius Order
router.put('/syliusOrder/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Sylius Order
router.delete('/syliusOrder/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Sylius Orders
router.get('/syliusOrder', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Sylius Orders
router.get('/syliusOrder/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-number-of-records
  // Improve performances disabling pagination: https://docs.forestadmin.com/documentation/reference-guide/performance#disable-pagination-count
  next();
});

// Get a Sylius Order
router.get('/syliusOrder/\\b(?!count\\b):recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Sylius Orders
router.get('/syliusOrder.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Sylius Orders
router.delete('/syliusOrder', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

module.exports = router;

/**
 * Generic function to create issue
 * 
 * @param {*} type 
 * @param {*} request 
 * @param {*} response 
 */
function createCustomerIssue(type, request, response) {
  const recordsGetter = new RecordsGetter(order, request.user, request.query);
  recordsGetter.getIdsFromRequest(request)
    .then(orderIds => orderIds[0])
    .then(orderId => {
      const recordCreator = new RecordCreator(customerIssue, request.user, request.query);
      return recordCreator.create({
        'state': 'New',
        'type': type,
        'order': orderId
      });
    })
    .then(() => response.send({ success: 'Payment issue has been created' }))
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: 'An error as occured' });
    })
  }