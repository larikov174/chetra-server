const router = require('express').Router();
const { updateResultValidation } = require('../middlewares/validation');
const { updateResult } = require('../controllers/result');

router.patch('/', updateResultValidation, updateResult);

module.exports = router;
