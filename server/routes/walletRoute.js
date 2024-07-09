const { walletTopup, payment, walletWithdrawal, getTotalSales } = require('../controllers/walletController');
const { authenticate } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/topup', authenticate, walletTopup);
router.post('/payment', authenticate, payment);
router.post('/withdrawal', authenticate, walletWithdrawal);
router.post('/get-sales', authenticate, getTotalSales);

module.exports = router;