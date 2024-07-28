const Property = require('../models/property');
const { getPropertyBucket, getProfileBucket } = require('../helpers/getBuckets');
const { getPictures } = require('../helpers/getPictures');
const getDateAMonthAgo = require('../helpers/getDateAMonthAgo');
const getRandomProperties = require('../helpers/getRandomProperties');
const User = require('../models/user');
const Notification = require('../models/notification');

const uploadProperty = async (req, res) => {
    try {
        const { price, type, location, description } = req.body;

        if (!price || !type || !location || !description) {
            return res.json({ error: 'Input fields cannot be empty' });
        }

        if (!req.files || req.files.length === 0) {
            return res.json({ error: 'No files uploaded' });
        }

        const imageIds = req.files.map(file => file.id);

        const agentId = req.user.id;

        const numericPrice = price.replace(/,/g, '');
        
        const newProperty = new Property({
            img: imageIds,
            price: numericPrice,
            type,
            location,
            description,
            reviews: [],
            agent: agentId,
            isBought: false
        });

        const property = await newProperty.save();

        if (!property) return res.json({ error: 'An error occurred while uploading property details' });

        const img = await getPictures(getPropertyBucket(), req.files[0].id);

        const agent = await User.findById(property.agent);
        
        const users = await User.find({ isAdmin: false });

        users.forEach(async (user) => {
            const newNotification = new Notification({
                img,
                users: user._id,
                title: 'New property upload',
                content: `Agent ${agent.fullname} uploaded a property located at ${property.location}`,
                link: `/properties/${property._id}`,
                read: false,
                type: 'property'
            });

            await newNotification.save();
        });

        return res.json({ message: 'Property uploaded successfully' });
    } catch (error) {
        console.log(error);
        res.json({ error: 'Error uploading property details' });
    }
}

const getAllProperties = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;

        const properties = await Property.find().sort({ createdAt: -1 }).lean(false);

        if (!properties) return res.json({ error: 'There are no properties' });

        if (properties.length === 0) return res.json({ properties });

        const fetchPropertyImages = async (properties) => {
            return Promise.all(properties.map(async (property) => {
                const images = await Promise.all(property.img.map(async (id) => {
                    const imgData = await getPictures(getPropertyBucket(), id);
                    return imgData;
                }));
                return { ...property.toObject(), img: images };
            }));
        }

        const allPropertiesWithImages = await fetchPropertyImages(properties);

        const popularProperties = await Property.find().sort({ reviews: -1 }).limit(limit).lean(false);
        const newListings = await Property.find().sort({ createdAt: -1 }).limit(limit).lean(false);

        const popularPropertiesWithImages = await fetchPropertyImages(popularProperties);
        const newPropertiesWithImages = await fetchPropertyImages(newListings);

        const fetchFeaturedPropertyImages = async (properties) => {
            return Promise.all(properties.map(async (property) => {
                const images = await Promise.all(property.img.map(async (id) => {
                    const imgData = await getPictures(getPropertyBucket(), id);
                    return imgData;
                }));
                return { ...property, img: images };
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
        const { propertyId } = req.params;
        const property = await Property.findById(propertyId).lean(false);

        if (!property) return res.json({ error: 'Property not found' });

        const images = await Promise.all(property.img.map(async (imgId) => {
            const imgData = await getPictures(getPropertyBucket(), imgId);
            return imgData;
        }));

        const agent = await User.findById(property.agent);

        if (!agent) return res.json({ error: 'Could not get agent details' });

        return res.json({ property: { ...property.toObject(), img: images }, agent });
    } catch (error) {
        console.log(error);
        res.json({ error: 'Error occurred while getting property details' });
    }
};

const getMyProperties = async (req, res) => {
    try {
        const agent = req.user.id;
        const properties = await Property.find({ agent }).sort({ createdAt: -1 }).lean(false);

        if (!properties || properties.length === 0) {
            return res.json({ error: 'No properties', totalProperties: 0 });
        }

        const fetchPropertyImages = async (properties) => {
            return Promise.all(properties.map(async (property) => {
                const images = await Promise.all(property.img.map(async (id) => {
                    const imgData = await getPictures(getPropertyBucket(), id);
                    return imgData;
                }));
                return { ...property.toObject(), img: images };
            }));
        };

        const propertiesWithImage = await fetchPropertyImages(properties);

        const totalPropertiesAddedPastMonth = await Property.countDocuments({
            agent,
            createdAt: { $gte: getDateAMonthAgo() }
        });

        return res.json({ propertiesWithImage, totalProperties: propertiesWithImage.length, totalPropertiesAddedPastMonth });
    } catch (error) {
        console.log(error);
        res.json({ error: 'Error occurred while getting all properties' });
    }
};

const editProperty = async (req, res) => {
    try {
        const { price, type, location, description } = req.body;
        const { propertyId } = req.params;

        if (!price || !type || !location || !description) return res.json({ error: 'Input fields cannot be empty' });

        if (!req.files || req.files.length === 0) return res.json({ error: 'No files uploaded' });

        const imageIds = req.files.map(file => file.id);

        const agentId = req.user.id;

        const numericPrice = price.replace(/,/g, '');

        const updatedProperty = await Property.findByIdAndUpdate(propertyId, {
            img: imageIds,
            price: numericPrice,
            type,
            location,
            description,
            agent: agentId,
        }, { new: true });

        if (!updatedProperty) return res.json({ error: 'Could not update property' });

        return res.json({ message: 'Property updated successfully', updatedProperty });
    } catch (error) {
        console.log(error);
        return res.json({ error: 'An error occurred while updating property' });
    }
}

const fetchUserDetails = async (req, res) => {
    try {
        const { agentId } = req.params;

        const agent = await User.findById(agentId);
        
        if (!agent) return res.json({ error: 'Could not get agent details' });

        if (agent.profileImg === "") return res.json({ agent });

        const img = await getPictures(getProfileBucket(), agent.profileImg);

        return res.json({ agent: { ...agent.toObject(), profileImg: img } });
    } catch (error) {
        console.log(error);
        return res.json({ error: 'An error occurred while getting agent\'s details' })
    }
}

const getSearchProperties = async (req, res) => {
    try {
        const { query } = req.params;

        if (!query) return res.json({ error: 'Enter a search query' });

        const properties = await Property.find({ $text: {$search: query} });

        if (!properties) return res.json({ error: 'There are not properties with this search query' });

        const fetchPropertyImages = async (properties) => {
            return Promise.all(properties.map(async (property) => {
                const images = await Promise.all(property.img.map(async (id) => {
                    const imgData = await getPictures(getPropertyBucket(), id);
                    return imgData;
                }));
                return { ...property.toObject(), img: images[0] };
            }));
        };

        const propertiesWithImage = await fetchPropertyImages(properties);

        return res.json({ propertiesWithImage });
    } catch (error) {
        console.log(error);
        return res.json({ error: 'Could not get properties' });
    }
}

module.exports = {
    uploadProperty,
    getAllProperties,
    getPropertyDetails,
    getMyProperties,
    editProperty,
    fetchUserDetails,
    getSearchProperties,
}