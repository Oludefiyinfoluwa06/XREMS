const router = require('express').Router();
const { authenticate } = require('../middlewares/auth');
const { getUsers, sendMessage, getMessages } = require('../controllers/chatController');

router.get('/users', authenticate, getUsers);
router.post('/send/:receipientId', authenticate, sendMessage);
router.get('/messages/:receipientId', authenticate, getMessages);

module.exports = router;