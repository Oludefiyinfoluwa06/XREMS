const { uploadProperty, getAllProperties, getPropertyDetails, getMyProperties, getSearchProperties, fetchAgentDetails } = require('../controllers/propertyController');
const { authenticate } = require('../middlewares/auth');
const { propertyUpload } = require('../middlewares/upload');

const router = require('express').Router();

router.post('/upload', authenticate, propertyUpload.single('picture'), uploadProperty);
router.get('/all', getAllProperties);
router.get('/:propertyId', authenticate, getPropertyDetails);
router.get('/all/agent', authenticate, getMyProperties);
router.get('/agent/:agentId', authenticate, fetchAgentDetails);
router.get('/search/:query', authenticate, getSearchProperties);

module.exports = router;