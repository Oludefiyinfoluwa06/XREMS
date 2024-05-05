const { signup, signin } = require("../controllers/authController");

const router = require("express").Router();

router.post('/sign-up', signup);
router.post('/sign-in', signin);

module.exports = router;