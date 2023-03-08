const express = require('express');
const { PermissionMiddlewareCreator, RecordsGetter } = require('forest-express-sequelize');
const { customerIssue } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('customerIssue');

// This file contains the logic of every route in Forest Admin for the collection customerIssue:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions

/**
 * Smart Action : 'Issue solved'
 */
router.post('/actions/issue-solved', permissionMiddlewareCreator.smartAction(), (request, response) => {
  const recordsGetter = new RecordsGetter(customerIssue, request.user, request.query);
  recordsGetter.getIdsFromRequest(request)
    .then(customerIssueIds => {
      customerIssue.update({
        state: 'Closed',
        closed_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      }, { where: { id: customerIssueIds }})
    })
    .then(() => response.send({ success: 'Issue has been solved' }))
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: 'An error as occured' });
    })
});

// Create a Customer Issue
router.post('/customerIssue', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Customer Issue
router.put('/customerIssue/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Customer Issue
router.delete('/customerIssue/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Customer Issues
router.get('/customerIssue', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Customer Issues
router.get('/customerIssue/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-number-of-records
  // Improve performances disabling pagination: https://docs.forestadmin.com/documentation/reference-guide/performance#disable-pagination-count
  next();
});

// Get a Customer Issue
router.get('/customerIssue/\\b(?!count\\b):recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Customer Issues
router.get('/customerIssue.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Customer Issues
router.delete('/customerIssue', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

module.exports = router;
