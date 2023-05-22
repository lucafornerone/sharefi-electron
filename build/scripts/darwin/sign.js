/**
 * A module that allow to sign mas
 *
 * @requires exec
 * @requires path
 * @requires signAsync
 */

// Npm modules
const exec = require('child_process').exec;
const path = require('path')
const { signAsync } = require('@electron/osx-sign')

// Base app path
const basePath = path.join(__dirname, '../../..');

/**
 * Sign MAS app
 * @param  {String}           appPath App Name
 * @return {Promise<Boolean>}
 */
async function signMasApp(appPath) {

    return new Promise((resolve, reject) => {
        signAsync({
            app: `${basePath}/${appPath}`,
            provisioningProfile: '<path-to-provisioning-profile>',
            identity: '<keychain-certificate-name>'
        })
            .then(function () {
                resolve(true);
            })
            .catch(function (err) {
                resolve(false);
            });
    });
}

/**
 * Resign and package for store
 * @param  {String}           folder OS script folder
 * @param  {String}           script Script name
 * @return {Promise<Boolean>}        Status
 */
async function resignPackage(folder, script) {

    const basePath = path.join(__dirname, '..');

    return await new Promise((resolve, reject) => {

        exec(`${basePath}/${folder}/${script}`, function (error) {
            error ? reject(false) : resolve(true);
        });

    });

}

module.exports = {
    signMasApp,
    resignPackage
}