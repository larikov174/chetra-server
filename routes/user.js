const router = require('express').Router();
const { getUserValidation } = require('../middlewares/validation');
const { getUserByEmail } = require('../controllers/user');

router.get('/', getUserValidation, getUserByEmail);

module.exports = router;
