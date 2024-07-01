const Property = require('../models/property');

const uploadProperty = async (req, res) => {
    const { img, price, type, location, description, owner } = req.body;

    
}

module.exports = {
    uploadProperty,
}