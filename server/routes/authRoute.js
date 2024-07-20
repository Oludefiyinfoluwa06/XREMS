const { signup, signin, updateProfile, receiveOtp, resetPassword, getUser } = require("../controllers/authController");
const { authenticate } = require("../middlewares/auth");
const { profileUpload } = require('../middlewares/upload');

const router = require("express").Router();

router.post('/sign-up', signup);
router.post('/sign-in', signin);
router.put('/update-profile', authenticate, profileUpload.single('image'), updateProfile);
router.post('/receive-otp', receiveOtp);
router.put('/reset-password', resetPassword);
router.get('/user', authenticate, getUser);

module.exports = router;