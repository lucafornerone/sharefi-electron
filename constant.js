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

/** Application default subnet */
const defaultSubnet = '255.255.255.0';

/** Application supported subnets with total hosts */
const supportedSubnets = new Map([
	['255.255.255.255', 1],
	['255.255.255.254', 2],
	['255.255.255.252', 4],
	['255.255.255.248', 8],
	['255.255.255.240', 16],
	['255.255.255.224', 32],
	['255.255.255.192', 64],
	['255.255.255.128', 128],
	[defaultSubnet, 256],
	['255.255.254.0', 512],
	['255.255.252.0', 1024],
	['255.255.248.0', 2048]
]);

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
	wiredConnectionDescription,
	defaultSubnet,
	supportedSubnets
}