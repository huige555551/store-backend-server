const router = require('express').Router();
const config = require('../config.json');
const jwt = require('jsonwebtoken');

const userController = require('./user.controller');
const authenticateController = require('./authenticate.controller');
const tempUserController = require('./tempUser.controller');

function verifyToken(req, res, next) {
  if (req.headers.token || req.query.token) {
    // 如果有携带token,校验token是否合法
    const token = req.headers.token || req.query.token;
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.send('服务器错误:', err);
      }
      if (decoded) {
        next();
      } else {
        res.send('无效token');
      }
    });
  } else {
    // 不然提示需要携带token
    res.send('该请求需要携带Token!');
  }
}

router.use('/auth', authenticateController);
router.use('/user', verifyToken, userController);
router.use('/tempUser', tempUserController);

module.exports = router;