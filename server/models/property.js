const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    img: String,
    price: Number,
    type: String,
    location: String,
    description: String,
    rating: Number,
    reviews: [mongoose.Schema.Types.ObjectId],
    agent: mongoose.Schema.Types.ObjectId,
}, { timestamps: true });

const Property = mongoose.model('Property', PropertySchema);
module.exports = Property;