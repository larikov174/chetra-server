const router = require('express').Router();
const { getUserValidation } = require('../middlewares/validation');
const { getUserByEmail } = require('../controllers/user');

router.post('/', getUserValidation, getUserByEmail);

module.exports = router;
