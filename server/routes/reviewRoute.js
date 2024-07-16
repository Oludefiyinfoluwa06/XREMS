const { getReviews, addReview } = require('../controllers/reviewController');
const { authenticate } = require('../middlewares/auth');

const router = require('express').Router();

router.get('/all/:propertyId', authenticate, getReviews);
router.post('/add/:propertyId', authenticate, addReview);

module.exports = router;