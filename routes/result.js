const router = require('express').Router();
const { resultValidation } = require('../middlewares/validation');
const { createResult, updateResult } = require('../controllers/result');

router.post('/', resultValidation, createResult);
router.put('/', resultValidation, updateResult);

module.exports = router;
