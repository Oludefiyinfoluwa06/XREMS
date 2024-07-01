const Property = require('../models/property');
const { getPropertyBucket } = require('../utils/getBuckets');
const { getPictures } = require('../utils/getPictures');
const { ObjectId } = require('mongoose').Types;

const uploadProperty = async (req, res) => {
    try {
        const { price, type, location, description } = req.body;

        if (!price || !type || !location || !description) {
            return res.status(400).json({ error: 'Input fields cannot be empty' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'File upload unsuccessful' });
        }
        
        const newProperty = new Property({
            img: req.file.id,
            price,
            type,
            location,
            description,
            rating: 0,
            reviews: [],
            owner: req.user.id
        });

        const property = await newProperty.save();
        return res.status(200).json({ message: 'Property uploaded successfully', property });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error uploading property details' });
    }
}

const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();

        if (!properties || properties.length === 0) {
            return res.status(404).json({ error: 'No properties' });
        }

        const propertiesWithImages = await Promise.all(properties.map(async (property) => {
            const img = await getPictures(getPropertyBucket(), property.img);
            return { ...property.toObject(), img };
        }));

        return res.status(200).json({ propertiesWithImages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error occurred while getting all properties' });
    }
}

const getPropertyDetails = async (req, res) => {
    try {
        const property = await Property.findById(req.params.propertyId);

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        const img = await getPictures(getPropertyBucket(), property.img);

        return res.status(200).json({ property, img });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error occurred while getting property details' });
    }
}

const getMyProperties = async (req, res) => {
    try {
        const userId = req.user.id;
        const properties = await Property.find({ owner: new ObjectId(userId) });

        if (!properties || properties.length === 0) {
            return res.status(404).json({ error: 'No properties' });
        }

        const propertiesWithImages = await Promise.all(properties.map(async (property) => {
            const img = await getPictures(getPropertyBucket(), property.img);
            return { ...property.toObject(), img };
        }));

        return res.status(200).json({ propertiesWithImages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error occurred while getting all properties' });
    }
}

const getMyPropertyDetails = async (req, res) => {
    try {
        const property = await Property.findById(req.params.propertyId);

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        const img = await getPictures(getPropertyBucket(), property.img);

        return res.status(200).json({ property, img });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error occurred while getting property details' });
    }
}

module.exports = {
    uploadProperty,
    getAllProperties,
    getPropertyDetails,
    getMyProperties,
    getMyPropertyDetails
}