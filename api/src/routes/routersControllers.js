const { Router } = require('express');
const { getAllProducts } = require('../controllers');
const router = Router();

router.get('/', async (req, res) => {
  try {
    let respuesta = await getAllProducts();
    res.json(respuesta);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
