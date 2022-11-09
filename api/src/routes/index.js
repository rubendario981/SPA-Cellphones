const { Router } = require('express');
const router = Router();
const controllers = require('./routersControllers.js');

router.use('/products', controllers);

module.exports = router;
