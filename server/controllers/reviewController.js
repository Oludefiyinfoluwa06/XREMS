const Property = require("../models/property");
const Review = require("../models/review");
const User = require("../models/user");
const Notification = require("../models/notification");

const getReviews = async (req, res) => {
    try {
        const { propertyId } = req.params
        const reviews = await Review.find({ property: propertyId });

        if (!reviews) return res.json({ error: 'Cannot get reviews' });

        const reviewsWithReviewers = await Promise.all(reviews.map(async review => {
            const reviewer = await User.findById(review.reviewer);

            if (!reviewer) return res.json({ error: 'Cannot find reviewer\'s details' });

            return {
                ...review._doc,
                reviewer: reviewer.fullname,
                profilePic: reviewer.profileImg
            };
        }));

        return res.json({ reviews: reviewsWithReviewers });
    } catch (error) {
        console.log(error);
        return res.json({ error: 'An error occurred while trying to get reviews' });
    }
}

const addReview = async (req, res) => {
    try {
        const { review } = req.body;
        const reviewer = req.user.id;
        const { propertyId } = req.params;

        if (!review) return res.json({ error: 'Write a review' });

        const newReview = new Review({ review, reviewer, property: propertyId });

        const reviewContent = await newReview.save();

        if (!reviewContent) return res.json({ error: 'An error occured' });

        const property = await Property.findByIdAndUpdate(req.params.propertyId, { $push: { reviews: reviewContent._id } }, { new: true });

        if (!property) return res.json({ error: 'Property not found' });

        const user = await User.findById(reviewer);

        const agent = await User.findById(property.agent);

        const newNotification = new Notification({
            img: user.profileImg,
            user: agent._id,
            title: 'New review',
            content: `${user.fullname} sent a review about your property in ${property.location}`,
            link: `/admin/reviews/${property._id}`,
            read: false,
            type: 'user'
        });

        await newNotification.save();

        return res.json({ message: 'Review sent successfully' });
    } catch (error) {
        console.log(error);
        return res.json({ error: 'An error occurred while sending review' });
    }

}

module.exports = {
    getReviews,
    addReview,
}