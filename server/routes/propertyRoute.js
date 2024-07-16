const { uploadProperty, getAllProperties, getPropertyDetails, getMyProperties, getAgentDetails, getSearchProperties } = require('../controllers/propertyController');
const { authenticate } = require('../middlewares/auth');
const { propertyUpload } = require('../middlewares/upload');

const router = require('express').Router();

router.post('/upload', authenticate, propertyUpload.single('picture'), uploadProperty);
router.get('/all', getAllProperties);
router.get('/:propertyId', authenticate, getPropertyDetails);
router.get('/my', authenticate, getMyProperties);
router.get('/search', authenticate, getSearchProperties);

module.exports = router;