/**
 * A module that allow to build Client App
 *
 * @requires child_process
 * @requires path
 */

// Npm modules
const exec = require('child_process').exec;
const path = require('path');

/**
 * Build Client App
 * @return {Promise<Boolean>} Build status
 */
async function buildClient() {

    return await new Promise((resolve, reject) => {

        exec('npm run build-dist', {
            cwd: path.join(__dirname, '../../../client')
        }, function (error) {
            error ? reject(false) : resolve(true);
        });

    });
}

module.exports = {
    buildClient
}