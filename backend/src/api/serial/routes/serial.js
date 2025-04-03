'use strict';

/**
 * serial router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::serial.serial');
