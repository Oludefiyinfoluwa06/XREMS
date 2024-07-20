const { uploadProperty, getAllProperties, getPropertyDetails, getMyProperties, getSearchProperties, fetchUserDetails, editProperty } = require('../controllers/propertyController');
const { authenticate } = require('../middlewares/auth');
const { propertyUpload } = require('../middlewares/upload');

const router = require('express').Router();

router.post('/upload', authenticate, propertyUpload, uploadProperty);
router.get('/all', getAllProperties);
router.get('/:propertyId', authenticate, getPropertyDetails);
router.get('/all/agent', authenticate, getMyProperties);
router.put('/edit/:propertyId', authenticate, propertyUpload, editProperty);
router.get('/agent/:agentId', authenticate, fetchUserDetails);
router.get('/search/:query', authenticate, getSearchProperties);

module.exports = router;