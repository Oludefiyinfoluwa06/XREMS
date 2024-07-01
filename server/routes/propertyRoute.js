const { uploadProperty } = require('../controllers/propertyController');

const router = require('express').Router();

router.post('/upload', uploadProperty);

module.exports = router;