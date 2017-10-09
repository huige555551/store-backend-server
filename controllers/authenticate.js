const express = require('express');
const router = express.Router();
const authService = require('../services/authenticate');

// routes
// /api/auth/login
router.post('/login', authenticate);

module.exports = router;

// middleware
function authenticate (req, res) {
  const username = req && req.body.username;
  const password = req && req.body.password;
  authService.authenticate({
    username: username,
    password: password
  })
    .then(result => {
      if (result.code === 200) {
        res.json(result.user);
      } else {
        res.sendStatus(result.code);
      }
    })
    .catch(err => {
      res.sendStatus(400).send(err);
    })
}
