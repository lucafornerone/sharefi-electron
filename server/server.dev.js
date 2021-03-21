/**
 * A script that start the dev server
 *
 * @requires express
 * @requires cors
 * 
 * @requires constant
 * @requires configuration
 * @requires routes
 */

// Npm modules
const express = require('express');
const cors = require('cors');

// App modules
const constant = require('../constant');
const configuration = require('../configuration');
const routes = require('./routes/route');

async function startDevServer() {

	// Initialize app configuration
	if (await configuration.initializeConfig(false)) {

		// Create Express App
		var app = express();

		// Add JSON support
		app.use(express.json());

		// Remove cors errors
		app.options('*', cors());

		// Allow only from localhost
		app.use(function (req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
			next();
		});

		// Initialize Express route
		app.use(`/${constant.appName}`, routes);

		// Start HTTP server
		var server = app.listen(constant.port, () => console.log('Server started in dev mode'));
		server.on('error', function (e) {
			console.log(`Server error: ${e}`);
		});

	}
}

startDevServer();