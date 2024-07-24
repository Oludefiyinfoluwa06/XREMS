const { getNotifications, getUnreadNotifications } = require('../controllers/notificationController');
const { authenticate } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/unread', authenticate, getUnreadNotifications);
router.get('/all', authenticate, getNotifications);

module.exports = router;