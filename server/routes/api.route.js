const router = require('express').Router();
const ApiController = require('../controllers/ApiController');

router.get('/getMenuSubscriptions/:id', ApiController.getMenuSubscriptions);
router.get('/getFeedback', ApiController.getFeedback);
router.get('/getUserProfile/:id', ApiController.getUserProfile);
router.get('/getSubscriptions', ApiController.getSubscriptions);

router.post('/postFeedback', ApiController.postFeedback);

router.patch('/patchUserProfile/:id', ApiController.patchUserProfile);

module.exports = router;
