const db = require('../helpers/db');
const User = require('../models/user');

let service = {}
service.getAll = getAll;

module.exports = service;

function getAll () {
  return User.find({});
}