const { Router } = require('express');
const { createUser } = require('../controllers');
const router = Router();

router.post('/create', async (req, res) => {
  try {
    res.json(await createUser(req.body));
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
