const exportss   = require('express');
const router = exportss.Router();
const stripeController = require('../controllers/stripes.controller');

router.post('/create-checkout-session', stripeController.createCheckOutSession);
router.post('/webhook', stripeController.webhook);

module.exports = router;