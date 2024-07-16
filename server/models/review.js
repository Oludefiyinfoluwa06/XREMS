const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: String,
    reviewer: mongoose.Schema.Types.ObjectId,
    property: mongoose.Schema.Types.ObjectId,
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;