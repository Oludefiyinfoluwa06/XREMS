const { uploadProperty, getAllProperties, getPropertyDetails, getMyProperties } = require('../controllers/propertyController');
const { authenticate } = require('../middlewares/auth');
const { propertyUpload } = require('../middlewares/upload');

const router = require('express').Router();

router.post('/upload', authenticate, propertyUpload.single('picture'), uploadProperty);
router.get('/all', getAllProperties);
router.get('/all/:propertyId', authenticate, getPropertyDetails);
router.get('/my', authenticate, getMyProperties);
// router.get('/my/:propertyId', authenticate, getMyPropertyDetails);

module.exports = router;