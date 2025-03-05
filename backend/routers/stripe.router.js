const exports = require('express');
const router = exports.Router();
const stripeController = require('../controllers/stripe.controller');

router.post('/create-checkout-session', stripeController.createCheckOutSession);

module.exports = router;