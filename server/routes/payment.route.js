const router = require('express').Router();
const PaymentController = require('../controllers/PaymentController');

router.post('/create-order', PaymentController.createOrder);
router.post('/pay-order', PaymentController.payOrder);

module.exports = router;
