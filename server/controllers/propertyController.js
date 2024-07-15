const { ObjectId } = require('mongoose').Types;
const Property = require('../models/property');
const { getPropertyBucket } = require('../helpers/getBuckets');
const { getPictures } = require('../helpers/getPictures');
const getDateAMonthAgo = require('../helpers/getDateAMonthAgo');
const getRandomProperties = require('../helpers/getRandomProperties');
const User = require('../models/user');

const uploadProperty = async (req, res) => {
    try {
        const { price, type, location, description } = req.body;

        if (!price || !type || !location || !description) {
            return res.json({ error: 'Input fields cannot be empty' });
        }

        if (!req.file) {
            return res.json({ error: 'File upload unsuccessful' });
        }

        const agentId = req.user.id;
        
        const newProperty = new Property({
            img: req.file.id,
            price,
            type,
            location,
            description,
            rating: 0,
            reviews: [],
            agent: agentId,
        });

        const property = await newProperty.save();
        return res.json({ message: 'Property uploaded successfully', property });
    } catch (error) {
        console.log(error);
        res.json({ error: 'Error uploading property details' });
    }
}

const getAllProperties = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;

        const [popularProperties, newListings, properties] = await Promise.all([
            Property.find().sort({ rating: -1 }).limit(limit).lean(false),
            Property.find().sort({ createdAt: -1 }).limit(limit).lean(false),
            Property.find().lean(false)
        ]);

        const fetchPropertyImages = async (properties) => {
            return Promise.all(properties.map(async (property) => {
                const img = await getPictures(getPropertyBucket(), property.img);
                return { ...property.toObject(), img }
            }));
        }

        const [popularPropertiesWithImages, newPropertiesWithImages, allPropertiesWithImages] = await Promise.all([
            fetchPropertyImages(popularProperties),
            fetchPropertyImages(newListings),
            fetchPropertyImages(properties)
        ]);

        const fetchFeaturedPropertyImages = async (properties) => {
            return Promise.all(properties.map(async (property) => {
                const img = await getPictures(getPropertyBucket(), property.img);
                return { ...property, img };
            }));
        };

        const featuredProperties = await getRandomProperties(limit);
        const featuredPropertiesWithImages = await fetchFeaturedPropertyImages(featuredProperties);

        res.json({
            featuredPropertiesWithImages,
            popularPropertiesWithImages,
            newPropertiesWithImages,
            allPropertiesWithImages
        });
    } catch (error) {
        console.log(error);
        res.json({ error: 'Error occurred while getting all properties' });
    }
};


const getPropertyDetails = async (req, res) => {
    try {
        const property = await Property.findById(req.params.propertyId);

        if (!property) {
            return res.json({ error: 'Property not found' });
        }

        const img = await getPictures(getPropertyBucket(), property.img);

        return res.json({ property, img });
    } catch (error) {
        console.log(error);
        res.json({ error: 'Error occurred while getting property details' });
    }
}

const getMyProperties = async (req, res) => {
    try {
        const agentId = req.user.id;
        const properties = await Property.find({ agent: new ObjectId(agentId) });

        if (!properties || properties.length === 0) {
            return res.json({ error: 'No properties', totalProperties: 0 });
        }

        const propertiesWithImage = await Promise.all(properties.map(async (property) => {
            const img = await getPictures(getPropertyBucket(), property.img);
            return { ...property.toObject(), img };
        }));

        const totalPropertiesAddedPastMonth = await Property.countDocuments({
            agentId: new ObjectId(agentId),
            createdAt: { $gte: getDateAMonthAgo() }
        });

        return res.json({ propertiesWithImage, totalProperties: propertiesWithImage.length, totalPropertiesAddedPastMonth });
    } catch (error) {
        console.log(error);
        res.json({ error: 'Error occurred while getting all properties' });
    }
}

const getAgentDetails = async (req, res) => {    
    try {
        const { agentId } = req.params;

        const agent = await User.findById(agentId);

        if (!agent) return res.json({ error: 'Agent does not exist' });

        const { password: _, ...agentWithoutPassword } = agent.toObject();

        return res.json({ agentWithoutPassword });
    } catch (error) {
        console.log(error);
        res.json({ error: 'Error occurred while getting agent details' });
    }
}

module.exports = {
    uploadProperty,
    getAllProperties,
    getPropertyDetails,
    getMyProperties,
    getAgentDetails,
}