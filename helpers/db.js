const mongoose = require('mongoose');
const config = require('../config.json');

mongoose.connect(config.mongo.url, config.mongo.options);

const db = mongoose.connection;

module.exports = db;