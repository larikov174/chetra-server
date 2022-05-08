const router = require('express').Router();
const { getUserValidation } = require('../middlewares/validation');
const { getUserByEmail } = require('../controllers/result');

router.get('/', getUserValidation, getUserByEmail);

module.exports = router;
