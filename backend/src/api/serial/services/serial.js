'use strict';

/**
 * serial service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::serial.serial');
