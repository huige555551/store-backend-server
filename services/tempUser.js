const db = require('../helpers/db');
const TempUser = require('../models/tempUser');
const Q = require('q');

let service = {}
service.insertOneTempUser = insertOneTempUser;
service.getAllTempUsers = getAllTempUsers;

module.exports = service;

function insertOneTempUser (tempUser) {
  const deferred = Q.defer();
  TempUser.findOne(tempUser, (err, result) => {
    if (err) {
      deferred.reject(err);
    }
    if (result) {
      deferred.resolve(400);
    } else {
      let tUser = new TempUser(tempUser);
      tUser.save((err, res) => {
        if (err) {
          deferred.reject(err);
        } else {
          if (res) {
            deferred.resolve(200);
          } else {
            deferred.resolve('未知错误');
          }
        }
      });
    }
  });
  return deferred.promise;
}

function getAllTempUsers () {
  const deferred = Q.defer();
  TempUser.find({}, (err, result) => {
    if (err) {
      deferred.reject(err);
    }
    deferred.resolve(result);
  });
  return deferred.promise;
}