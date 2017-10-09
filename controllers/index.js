const router = require('express').Router();
const config = require('../config.json');
const verifyToken = require('../middlewares/verifyToken');

const authenticateController = require('./authenticate');
const userController = require('./user');
const tempUserController = require('./tempUser');

router.use('/auth', authenticateController);
router.use('/user', verifyToken, userController);
router.use('/tempUser', tempUserController);

module.exports = router;