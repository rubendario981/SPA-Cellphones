const { Router } = require('express');
const router = Router();
const controllers = require('./routersControllers.js');
const routersUser = require('./routersUser.js');

router.use('/products', controllers);
router.use('/user', routersUser);

module.exports = router;
