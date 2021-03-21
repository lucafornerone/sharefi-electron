/**
 * Main script to open app
 *
 * @requires electron
 * @requires url
 * @requires path
 *
 * @requires server
 */

// Npm modules
const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

// App modules
const expressApp = require('./server/server');

/**
 * Open Electron App
 * @return {Void}
 */
function openApp() {
	startServer();
}

/**
 * Start Express server, then create app window
 * @return {Void}
 */
async function startServer() {

	const server = await expressApp.startServer();
	if (server && server.status) {

		createWindow();
		console.log('Server started');

	} else {

		switch (server.error) {
			case 'busy-port':
				console.error('App already opened or busy port');
				// Close app
				app.quit();
				break;

			case 'corrupted-cert':
				console.error('Corrupted ssl cert file');
				// Reload SSL files
				break;

			case 'corrupted-key':
				console.error('Corrupted ssl key file');
				// Reload SSL files
				break;

			default:
				console.error('Unknown error');
				break;
		}
	}

}

/**
 * Create app window
 * @return {Void}
 */
function createWindow() {

	// Create the browser window
	const win = new BrowserWindow({
		width: 920,
		height: 560,
		minWidth: 700,
		minHeight: 550
	});

	// Load the index.html of the app
	win.loadURL(
		url.format({
			pathname: path.join(__dirname, '/dist/index.html'),
			protocol: 'file:',
			slashes: true
		})
	);


	// Open the DevTools
	// win.webContents.openDevTools();
	// Remove app default menu
	win.removeMenu();
}

// Ignore Chromium selfsigned warning errors
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

// Open Electron app
app.whenReady().then(openApp);

// User click on close all windows
app.on('window-all-closed', () => {

	// macOS have not close all windows
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
