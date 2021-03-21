/** 
 * A module that contains all app constants
 * @module constant
 */

/** Application Name */
const appName = 'sharefi';

/** Application Encoding */
const encoding = 'utf8';

/** Application Server Port */
const port = 5431; // sharefi -> 5h4r3f1 -> 5431 :)

/** Application Config File Name */
const configFileName = 'config.json';

/** Application Temp Folder Name */
const tmpFolder = 'tmp';

/** Application SSL Folder Name */
const sslFolder = 'ssl';

/** Application SSL Cert File Name */
const sslCertFileName = 'cert.pem';

/** Application SSL Key File Name */
const sslKeyFileName = 'key.pem';

/** Application SSL Key Size */
const sslKeySize = 2048;

/** Application SSL Certificate Expiration Days */
const sslExpirationDays = 9999;

/** Application SSL Certificate Algorithm */
const sslAlgorithm = 'sha256';

/** Application Internet Protocol Version */
const ipv = 'IPv4';

/** Application Temp File Extension */
const tmpFileExtension = '.zip';

/** Application Items Selection */
const itemsSelection = 'multiSelections';

/** Application wired connection description */
const wiredConnectionDescription = 'Wired';

module.exports = {
	appName,
	encoding,
	port,
	configFileName,
	tmpFolder,
	sslFolder,
	sslCertFileName,
	sslKeyFileName,
	sslKeySize,
	sslExpirationDays,
	sslAlgorithm,
	ipv,
	tmpFileExtension,
	itemsSelection,
	wiredConnectionDescription
}