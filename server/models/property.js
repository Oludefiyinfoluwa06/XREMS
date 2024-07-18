const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    img: String,
    price: Number,
    type: String,
    location: String,
    description: String,
    reviews: [mongoose.Schema.Types.ObjectId],
    agent: mongoose.Schema.Types.ObjectId,
}, { timestamps: true });

PropertySchema.index({ type: 'text', location: 'text', description: 'text' });

const Property = mongoose.model('Property', PropertySchema);
module.exports = Property;