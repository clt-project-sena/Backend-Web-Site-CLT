const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/user.controller');

router.post('/', auth.verifyToken, userController.create);
router.post('/login', userController.login);
router.get('/', auth.verifyToken, userController.findAll);
router.get('/:id', auth.verifyToken, userController.findOne);
router.put('/:id', auth.verifyToken, userController.update);
router.delete('/:id', auth.verifyToken, userController.delete);

module.exports = router;