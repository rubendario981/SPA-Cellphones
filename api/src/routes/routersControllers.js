const { Router } = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  getListBrands,
  getListOs,
  updateStock,
  updateCell,
  createBrand,
  getOrders,
  updateOrder
} = require("../controllers");
const Cellphone = require("../models/Cellphone");
const router = Router();

router.get("/", getAllProducts);

router.get("/brands", getListBrands);

router.get("/os", getListOs);

router.get("/get-orders", getOrders);

router.patch("/update-order", updateOrder);

router.get("/:id", getProductById);

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
