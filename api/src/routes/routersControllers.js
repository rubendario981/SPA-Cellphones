const { Router } = require('express');
const {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
} = require('../controllers');
const router = Router();

router.get('/', async (req, res) => {
  const name = req.query.name;

  try {
    if (name) return res.json(await getProductByName(name));
    return res.json(await getAllProducts());
  } catch (error) {
    res.json(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    return res.json(await getProductById(id));
  } catch (error) {
    res.json(error);
  }
});

router.post('/create', async (req, res) => {
  try {
    res.json(await createProduct(req.body));
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
