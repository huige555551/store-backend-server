const express = require('express');
const router = express.Router();
const tempUserService = require('../services/tempUser');

router.post('/insertOne', insertOneTempUser);
router.get('/all', getAllTempUsers);

module.exports = router;

function insertOneTempUser(req, res, next) {
  tempUserService.insertOneTempUser(req.body)
    .then(result => {
      console.log('insertResult:', result);
      if (result === 400) {
        res.sendStatus(400).send('该用户已存在');
      } else if (result === 200) {
        res.sendStatus(200).send('临时用户插入成功');
      }
    });
}

function getAllTempUsers (req, res, next) {
  tempUserService.getAllTempUsers()
    .then(result => {
      if (result) {
        res.send(result);
      }
    });
}