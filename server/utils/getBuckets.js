const mongoose = require('mongoose');

let propertyBucket;
let profileBucket;

mongoose.connection.on('connected', () => {
    propertyBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'property' });
    profileBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'profile' });
});

const getPropertyBucket = () => propertyBucket;
const getProfileBucket = () => profileBucket;

module.exports = {
    getPropertyBucket,
    getProfileBucket
};
