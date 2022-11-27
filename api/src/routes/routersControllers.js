const { Router } = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  getListBrands,
  getListOs,
  updateStock,
  updateCell,
  createBrand
} = require("../controllers");
const Cellphone = require("../models/Cellphone");
const router = Router();

router.get("/", getAllProducts);

router.get("/brands", getListBrands);

router.get("/os", getListOs);

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    return res.json(await getProductById(id));
  } catch (error) {
    res.json(error);
  }
});

router.post("/create", createProduct);

router.post("/new-brand", createBrand);

router.patch("/updateStock", updateStock);

router.patch("/updateCell", updateCell);

router.get("/test", async (req, res) => {
  console.log("------");
  const response = await Cellphone.findAll({
    include: Brand,
  });
  console.log(response[0], "***");
  res.json(response);
});

module.exports = router;
