const db = require('../helpers/db');
const config = require('../config.json');
const User = require('../models/user');
const jwt = require('jsonwebtoken'); // 用来创建web token
const Q = require('q');

let service = {}
service.authenticate = authenticate;

module.exports = service;

// 使用用户名和密码查找用户, 返回一个Promise对象(Q)
function authenticate (loginForm) {
  const deferred = Q.defer(); // 声明了一个promise对象
  const username = loginForm.username;
  const password = loginForm.password;
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      deferred.reject(err);
    }
    let result = {};
    if (user) {
      if (user.password === password) {
        // 验证通过后返回的用户信息: _id, username, realname, role, token
        let token = jwt.sign({ sub: user._id }, config.secret, { expiresIn: '7d' });
        result.code = 200;
        result.user = {
          _id: user._id,
          username: user.username,
          realname: user.realname,
          role: user.role,
          token: token
        }
      } else {
        result.code = 401;
      }
    } else {
      result.code = 404;
    }
    deferred.resolve(result);
  });
  // 返回一个promise对象 :)
  return deferred.promise;
}