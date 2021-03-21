/** 
 * A module that represents Express app router
 * @module appRouter
 * 
 * @requires express
 */

// Npm modules
const express = require('express');

// App modules
const appRouter = express.Router();

// App controllers
const configController = require('./controllers/configController');
const deviceController = require('./controllers/deviceContoller');
const itemController = require('./controllers/itemController');

// Controllers api endpoint
appRouter.use('/config', configController);
appRouter.use('/device', deviceController);
appRouter.use('/item', itemController);

module.exports = appRouter;