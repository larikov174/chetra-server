const router = require('express').Router();
const { createResultValidation, updateResultValidation } = require('../middlewares/validation');
const { createResult, updateResult } = require('../controllers/result');

router.post('/', createResultValidation, createResult);
router.put('/:id', updateResultValidation, updateResult);

module.exports = router;
