const { getTransactionHistory } = require('../controllers/transactionController');
const { authenticate } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/:user', authenticate, getTransactionHistory)