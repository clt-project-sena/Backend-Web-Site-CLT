const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const panelController = require('../controllers/panel.controller');

router.post('/', auth.verifyToken, panelController.create);
router.get('/', panelController.findAll);
router.get('/:id', panelController.findOne);
router.get('/view/image/:imageName', panelController.getImages);
router.put('/:id', auth.verifyToken, panelController.update);
router.delete('/:id', auth.verifyToken, panelController.delete);

module.exports = router;