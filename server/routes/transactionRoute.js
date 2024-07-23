const { getTransactionHistory } = require('../controllers/transactionController');
const { authenticate } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/all', authenticate, getTransactionHistory);

module.exports = router;