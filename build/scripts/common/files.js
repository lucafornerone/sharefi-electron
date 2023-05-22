/**
 * A module that allow to remove unused files
 *
 * @requires fs
 * @requires path
 */

// Npm modules
const fs = require('fs');
const path = require('path');

// Base build apps
const basePath = path.join(__dirname, '../..');

/**
 * Remove server README.md
 * @param  {String}        folder OS build folder
 * @return {Promise<Void>}
 */
async function removeServerReadme(folder) {

    const readme = `${basePath}/${folder}/server/README.md`;
    if (fs.existsSync(readme)) {
        fs.unlinkSync(readme);
    }

}

/**
 * Remove dev server starter
 * @param  {String}        folder OS build folder
 * @return {Promise<Void>}
 */
async function removeServerDev(folder) {

    const devServer = `${basePath}/${folder}/server/server.dev.js`;
    if (fs.existsSync(devServer)) {
        fs.unlinkSync(devServer);
    }

}

/**
 * Add string(s) to package.json
 * @param  {String}           folder  OS build folder
 * @param  {String[]}         strings Strings to add
 * @return {Promise<Boolean>}
 */
async function addToPackageJson(folder, strings) {

    const filePath = `${basePath}/${folder}/package.json`;

    const packageJson = await JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
    if (!packageJson) {
        return false;
    }

    let obj, key, value;
    strings.forEach(string => {
        obj = JSON.parse(string);
        key = Object.keys(obj)[0];
        value = Object.values(obj)[0];

        packageJson[key] = value;
    });

    fs.writeFileSync(filePath, JSON.stringify(packageJson), { encoding: 'utf8' },
        (error) => {
            new Error(error);
        }
    );

    return true;
}

/**
 * Copy file app from build folder
 * @param  {String}        folder      Build folder
 * @param  {String}        subFolder   Build sub folder
 * @param  {String}        currentName Current file name
 * @param  {String}        newName     New file name
 * @return {Promise<Void>}
 */
async function copyFile(folder, subFolder, currentName, newName) {

    const releasePath = path.join(__dirname, '../../../release');

    fs.copyFileSync(`${basePath}/${folder}/${subFolder}/${currentName}`, `${releasePath}/${newName}`);

}

/**
 * Override package.json name
 * @param  {String}           folder OS build folder
 * @param  {String}           name   New name
 * @return {Promise<Boolean>}
 */
async function overridePackageJsonName(folder, name) {

    const filePath = `${basePath}/${folder}/package.json`;

    const packageJson = await JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
    if (!packageJson) {
        return false;
    }

    packageJson.name = name;

    fs.writeFileSync(filePath, JSON.stringify(packageJson), { encoding: 'utf8' },
        (error) => {
            new Error(error);
        }
    );

    return true;
}

module.exports = {
    removeServerReadme,
    removeServerDev,
    addToPackageJson,
    copyFile,
    overridePackageJsonName
}