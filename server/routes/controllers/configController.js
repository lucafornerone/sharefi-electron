/** 
 * A module that handle device config's HTTP requests
 * @module configController 
 * 
 * @requires express
 * 
 * @requires ConfigElement
 * @requires hostMiddleware
 * @requires configService
 */

// Npm modules
const express = require('express');

// App modules
const configController = express.Router();
const ConfigElement = require('../../enums/ConfigElement');
const hostMiddleware = require('../middlewares/hostMiddleware');
const configService = require('../../services/configService');

/**
 * GET api to obtain user's set configs
 * @name config/get
 * @function
 * 
 * @return {Object} User's set configs
 */
configController.get('/get', hostMiddleware.sameHost, async (req, res) => {
    res.send(await configService.getConfigs());
});

/**
 * POST api to update device name
 * @name config/name
 * @function
 * 
 * @param  {String} name Updated device name
 * @return {Object}      User's set configs
 */
configController.post('/name', hostMiddleware.sameHost, async (req, res) => {

    const body = req.body;

    // Check HTTP body request syntax
    if (
        body &&
        body.name &&
        configService.isRightTypeof(body.name, ConfigElement.NAME)
    ) {
        res.send(await configService.updateName(body.name));
    } else {
        // Bad request
        res.status(400).send();
    }
});

/**
 * POST api to update device language
 * @name config/language
 * @function
 * 
 * @param  {String} language Updated device language code (ISO 639-1) - for more information: {@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes Wikipedia}
 * @return {Object}          User's set configs
 */
configController.post('/language', hostMiddleware.sameHost, async (req, res) => {

    const body = req.body;

    // Check HTTP body request syntax
    if (
        body &&
        body.language &&
        body.language.length === 2 &&
        configService.isRightTypeof(body.language, ConfigElement.LANGUAGE)
    ) {
        res.send(await configService.updateLanguage(body.language));
    } else {
        // Bad request
        res.status(400).send();
    }
});

/**
 * POST api to update device theme
 * @name config/theme
 * @function
 * 
 * @param  {String} theme Updated device theme
 * @return {Object}       User's set configs
 */
configController.post('/theme', hostMiddleware.sameHost, async (req, res) => {

    const body = req.body;

    // Check HTTP body request syntax
    if (
        body &&
        body.theme &&
        configService.isUpdatedThemeInThemeList(body.theme)
    ) {
        res.send(await configService.updateTheme(body.theme));
    } else {
        // Bad request
        res.status(400).send();
    }
});


module.exports = configController;