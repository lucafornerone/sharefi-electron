/** 
 * A module that contains ssl's functions
 * @module sslService
 * 
 * @requires fs
 * @requires selfsigned
 * 
 * @requires configuration
 * @requires constant
 */

// Npm modules
const fs = require('fs');
const selfsigned = require('selfsigned');

// App modules
const configuration = require('../../configuration');
const constant = require('../../constant');

/**
 * Get SSL credentials to start the server
 * @return {Promise<Object>} SSL credentials
 */
async function getCredentials() {

	// Get stats of SSL files
	const cert = fs.statSync(configuration.getSslCertificateCertFilePath());
	const key = fs.statSync(configuration.getSslCertificateKeyFilePath());

	// Check SSL files
	return (cert.size === 0 || key.size === 0) ? await _generateCertificate() : await _getCertificate();
}

/**
 * Generate the SSL certificates to start the server
 * @return {Promise<Object>} SSL credentials
 */
async function _generateCertificate() {

	// Certificate attributes
	const certificateAttrs = [{ name: constant.appName, value: constant.appName, type: '' }];
	// Certificate options
	const certificateOptions = {
		keySize: constant.sslKeySize,
		days: constant.sslExpirationDays,
		algorithm: constant.sslAlgorithm,
		extensions: [{
			name: 'subjectAltName',
			altNames: []
		}]
	};

	console.log('Begin selfsigned certificate creation');

	// Generate self signed certificate
	const pems = selfsigned.generate(certificateAttrs, certificateOptions);

	// Write base64 to pem files
	fs.writeFileSync(configuration.getSslCertificateCertFilePath(), pems.cert, { encoding: constant.encoding },
		(error) => {
			new Error(error);
		}
	);
	fs.writeFileSync(configuration.getSslCertificateKeyFilePath(), pems.private, { encoding: constant.encoding },
		(error) => {
			new Error(error);
		}
	);

	return {
		cert: pems.cert,
		key: pems.private
	}
}

/**
 * Get the SSL certificates to start the server
 * @return {Promise<Object>} SSL credentials
 */
async function _getCertificate() {

	// Load existing pem files
	const certificate = fs.readFileSync(configuration.getSslCertificateCertFilePath(), constant.encoding);
	const privateKey = fs.readFileSync(configuration.getSslCertificateKeyFilePath(), constant.encoding);

	console.log('Certificate already present');

	return {
		cert: certificate,
		key: privateKey
	}
}


module.exports = {
	getCredentials
}