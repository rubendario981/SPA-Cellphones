const axios = require("axios");
const { Cellphone, Os, Brand, Cart, Users, Rating } = require("../db.js");
const { Op } = require("sequelize");
const fs = require("fs-extra");
const { uploadImage } = require("../config/cloudinary.js");
const { sendMailCodeShipping, sendMailOrderDelivered } = require("../config/nodemailer.js");
const { createUsers, createCarts, createRatings } = require("../config/dataTest.js");

//Trae todos los productos de la api y los vuelca a la base de datos
async function getAllProducts(req, res) {
  const name = req?.query.name;
  if (name) return res.json(await getProductByName(name));

  try {
    const listCellphones = await Cellphone.findAll({
      include: [{ model: Brand }, { model: Os }],
    });

    // si no hay cellulares en la base de datos se procede a crearlos
    if (!listCellphones.length) {
      const brandsCell = [];
      const sysOperative = [];
      const products = await axios.get(
        `https://api-celulares-27ad3-default-rtdb.firebaseio.com/.json`
      );
      let initialData = products.data?.map((e) => ({
        //No podemos dejar el Id del prodcuto porque entonces no deja crear un0 nuevo producto que se le envie por formulario
        // id: e.id,
        brand: e.brand,
        name: e.name,
        image: e.image,
        screen: e.screen,
        internal_storage: e.internal_storage,
        front_camera: e.font_camera,
        rear_camera: e.rear_camera,
        cpu: e.cpu,
        ram: e.ram,
        SO: e.SO,
        battery: e.battery,
        color: e.Color,
        price: parseInt(e.price.split(" ")[0]),
        stock: Math.round(Math.random() * 50), //Se modifica el stock de esta forma, para poder hacer la funcionalidad en el carrito de compras.
      }));

      initialData.map(
        (e) => !brandsCell.includes(e.brand) && brandsCell.push(e.brand)
      );

      initialData.map(
        (e) =>
          !sysOperative.includes(e.SO.trim()) && sysOperative.push(e.SO.trim())
      );

      // Procede a crear las marcas en la base de datos
      brandsCell.sort().map(async (brand) => {
        await Brand.findOrCreate({ where: { name: brand } });
      });

      // Procede a crear los sistemas operativos
      sysOperative.map(async (so) => {
        await Os.findOrCreate({ where: { name: so } });
      });

      await Cellphone.bulkCreate(initialData);

      // se actualizan la lista de celulares para incluir las relaciones de marca y sistema operativo
      initialData.map(async (el) => {
        const findIdOs = await Os.findOne({ where: { name: el.SO.trim() } });

        const findIdBrand = await Brand.findOne({ where: { name: el.brand } });

        findIdOs &&
          findIdBrand &&
          (await Cellphone.update(
            { oId: findIdOs.id, brandId: findIdBrand.id },
            { where: { name: el.name } }
          ));
      });

      const cellphonesCreated = await Cellphone.findAll({
        include: [{ model: Brand }, { model: Os }],
      });
			await createUsers();
			await createCarts();
			await createRatings();
      return res?.json(
        cellphonesCreated.length > 0
          ? cellphonesCreated.sort((a, b) => a.id - b.id)
          : "No se pudieron crear los telefonos"
      );
    } else {
      return res?.json(listCellphones.sort((a, b) => a.id - b.id));
    }
  } catch (error) {
    return error;
  }
}

const getListBrands = async (req, res) => {
  try {
    const listBrands = await Brand.findAll();
    return res.json(
      listBrands.length > 0 ? listBrands : "No hay marcas disponibles"
    );
  } catch (error) {
    return res.json(error);
  }
};

const getListOs = async (req, res) => {
  try {
    const listOs = await Os.findAll();
    return res.json(listOs.length > 0 ? listOs : "No hay marcas disponibles");
  } catch (error) {
    return res.json(error);
  }
};

//Trae un producto segun su id
async function getProductById(req, res) {
	const id = req.params.id
  try {
		const findCell = await Cellphone.findByPk(id, {
			include: [ {model: Brand }, {model: Os}, { model: Rating }]
		})
    return findCell 
			? res.json(findCell)
			: res.status(404).json(`There are'n cellphone with id ${id}`)
  } catch (error) {
		console.log("Error on get product by Id", error);
		return res.status(500).json(error)
	}
}

//Trae todos los productos que en su nombre incluyan el name que se busca
async function getProductByName(name) {
  try {
    let product = await Cellphone.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });

    return product.length ? product : "Product not found";
  } catch (error) {
    return error;
  }
}

//Crea un producto en la base de datos
async function createProduct(req, res) {
  const { name } = req.body;
  const { files } = req?.files;

  try {
    const response = await uploadImage(files.tempFilePath)
    await fs.unlink(files.tempFilePath)
    const createCell = await Cellphone.findOrCreate({
      where: { name },
      defaults: {
        ...req.body,
        image: response.url,
        idImage: response.public_id
      }
    });
    return createCell
      ? res.json(createCell)
      : res.status(400).json({ error: "No se pudo crear telefono" });
  } catch (error) {
    console.log("Error controller create product", error)
    return res.status(500).json(error);
  }
}

const createBrand = async (req, res) => {
  console.log(req.body);
  try {
    const newBrand = await Brand.findOrCreate({ where: { name: req.body.name } });
    return newBrand
      ? res.json(newBrand)
      : res.status(400).json("no se pudo crear la marca")
  } catch (error) {
    console.log("Error controller creando nueva marca", error);
    return res.status(500).json(error)
  }
}

async function updateStock(req, res) {
  const products = req.body;
  try {
    products.map(async (e) => {
      let cellphone = await Cellphone.findOne({
        where: { id: e.id },
      });
      cellphone.stock = e.stock - e.cant;
      await cellphone.save({ fields: ["stock"] });
      await cellphone.reload();
    });

    const listCellphones = await Cellphone.findAll();
    res.json(listCellphones);
  } catch (error) {
    res.json(error.message);
  }
}

const updateCell = async (req, res) => {
  const { id } = req.body;
  try {
    const cellUpdated = await Cellphone.update(
      { ...req.body },
      { where: { id } }
    )
    return cellUpdated[0] > 0
      ? res.json(await Cellphone.findAll())
      : res.status(404).json("Celular no encontrado")
  } catch (error) {
    console.log("Error controller update cellphone", error);
    return res.status(500).json(error)
  }
}

const getOrders = async (req, res) => {
  try {
    const orders = await Cart.findAll({
      include: [{ model: Users }, { model: Cellphone }],
    })
    return res.json(orders)
  } catch (error) {
    console.log("Error controller on get orders", error);
    return res.status(500).json(error)
  }
}

const updateOrder = async (req, res) => {
  const { id, status, shipping, code, total, user } = req.body
  console.log(user.email, user.name);
  try {
    const updateCart = await Cart.update(
      { status, shipping, code, total },
      { where: { id } }
    )
    
    updateCart[0] > 0 && status === "Despachado" && sendMailCodeShipping(user.email, user.name, total, shipping, code)
    updateCart[0] > 0 && status === "Entregado" && sendMailOrderDelivered(user.email, user.name, shipping)
    
    return updateCart[0] > 0
      ? res.json(await Cart.findAll({ include: [{ model: Users }, { model: Cellphone }] }))
      : res.status(404).json("No se encontro el pedido")
  } catch (error) {
    console.log("Error controller update order/cart ", error);
    return res.status(500).json(error)
  }
}
module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  getListBrands,
  getListOs,
  updateStock,
  updateCell,
  createBrand,
  getOrders,
  updateOrder,
};
