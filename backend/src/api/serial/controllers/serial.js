'use strict';

/**
 * serial controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::serial.serial');
