const { Router } = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
} = require('../controllers');
const router = Router();

router.get("/", getAllProducts)

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    return res.json(await getProductById(id));
  } catch (error) {
    res.json(error);
  }
});

router.post('/create', createProduct)

module.exports = router;
