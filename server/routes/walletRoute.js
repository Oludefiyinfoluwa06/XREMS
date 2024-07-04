const { walletTopup, payment, walletWithdrawal } = require('../controllers/walletController');
const { authenticate } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/topup', authenticate, walletTopup);
router.post('/payment', authenticate, payment);
router.post('/withdrawal', authenticate, walletWithdrawal);

module.exports = router;