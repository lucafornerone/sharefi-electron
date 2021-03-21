/**
 * A module that allow to start the server
 *
 * @requires express
 * @requires cors
 * @requires https
 * 
 * @requires constant
 * @requires configuration
 * @requires ServerError
 * @requires routes
 * @requires sslService
 * @requires itemShareService
 */

// Npm modules
const express = require('express');
const cors = require('cors');
const https = require('https');

// App modules
const constant = require('../constant');
const configuration = require('../configuration');
const ServerError = require('./models/ServerError');
const routes = require('./routes/route');
const sslService = require('./services/sslService');
const itemShareService = require('./services/itemShareService');

/**
 * Start Express.js server
 * @return {Promise<Object>} Server status and/or error
 */
async function startServer() {

	// Initialize app configuration
	if (await configuration.initializeConfig(true)) {

		// Create Express App
		var app = express();

		// Add JSON support
		app.use(express.json());

		// Remove cors errors
		app.options('*', cors());

		// Initialize Express route
		app.use(`/${constant.appName}`, routes);

		// Start HTTPS server
		const server = await _createServer(app);

		if (server && server.status && !server.error) {
			// Server started successfully
			return server;
		}

		// Server not started
		const serverError = new ServerError(server.error);

		return {
			status: server.status,
			error: serverError.error
		}
	}
}

/**
 * Create Express.js server
 * @param  {Any}             app Express.js instance
 * @return {Promise<Object>}     Server status and/or error
 */
async function _createServer(app) {

	try {

		let credentials = await sslService.getCredentials();

		return await new Promise((resolve, reject) => {

			// Create HTTPS secure server
			var server = https.createServer(credentials, app);

			server.listen(constant.port, () => {
				itemShareService.emptyTmpFolder();
				resolve({ status: true });
			});

			server.on('error', function (error) {
				reject({ status: false, error: error });
			});

		});

	} catch (error) {
		return { status: false, error: error };
	}

}

module.exports = {
	startServer
}