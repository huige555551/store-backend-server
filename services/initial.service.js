var mongoose = require('mongoose');
var config = require('../config.json');
var md5 = require('md5');
var User = require('../models/user.model');
var Q = require('q');

mongoose.connect(config.mongo.url, config.mongo.options);


var db = mongoose.connection;

function createAdmin () {
  const deferred = Q.defer();
  var admin = new User({
    username: 'admin',
    password: md5('admin'),
    realname: '系统管理员',
    role: ['sys_admin', 'user_admin']
  });
  admin.save((err, res) => {
    if (err) {
      deferred.reject(err);
    }
    if (res) {
      deferred.resolve('系统管理员创建成功!');
    } else {
      deferred.resolve('系统管理员创建失败!')
    }
  });
  return deferred.promise;
}

function initialDB () {
  const deferred = Q.defer();
  db.on('error', console.error.bind(console, '数据库连接错误:'));
  db.once('open', () => {
    User.findOne({
      username: 'admin',
      realname: '系统管理员'
    }, (err, user) => {
      if (user !== null) {
        deferred.resolve('系统管理员已存在!');
      } else {
        createAdmin()
          .then(doc => {
            deferred.resolve(doc);
          });
      }
    });
  })
  return deferred.promise;
}

module.exports = initialDB;