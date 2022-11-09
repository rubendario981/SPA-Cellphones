const { Router } = require("express");
const { getAllProducts } = require("../controllers");
const router = Router();

router.get("/", async (req, res) => {
  const name = req.query.name;
  const respuesta = await getAllProducts();
  if (name) {
    let productName = await respuesta.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    productName.length
      ? res.status(200).send(productName)
      : res.status(404).send("Product not found");
  }else {
    res.status(200).send(respuesta)
  }
});

module.exports = router;
