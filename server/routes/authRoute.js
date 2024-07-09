const { signup, signin, updateProfile, receiveOtp, resetPassword } = require("../controllers/authController");

const router = require("express").Router();

router.post('/sign-up', signup);
router.post('/sign-in', signin);
router.put('/update-profile', updateProfile);
router.post('/receive-otp', receiveOtp);
router.put('/reset-password', resetPassword);

module.exports = router;