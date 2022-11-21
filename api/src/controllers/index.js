const axios = require('axios');
const { Cellphone, Os, Brand } = require('../db.js');
const { Op } = require('sequelize');
const { usuariosPrueba, creatDatosPrueba } = require('./user.controllers.js');

//Trae todos los productos de la api y los vuelca a la base de datos
async function getAllProducts(req, res) {
  const name = req?.query.name;
  if (name) return res.json(await getProductByName(name));

  try {
    const listCellphones = await Cellphone.findAll({
      include: [
        { model: Brand },
        { model: Os }]
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
      include: [ 
        { model: Brand }, 
        { model: Os }]
    });
      await creatDatosPrueba()
      return res?.json(
        cellphonesCreated.length > 0
          ? cellphonesCreated
          : 'No se pudieron crear los telefonos'
      );
    } else {
      return res?.json(listCellphones);
    }
  } catch (error) {
    return error;
  }
}

const getListBrands = async (req, res) => {
  try {
    const listBrands = await Brand.findAll();
    return res.json(
      listBrands.length > 0 ? listBrands : 'No hay marcas disponibles'
    );
  } catch (error) {
    return res.json(error);
  }
};

const getListOs = async (req, res) => {
  try {
    const listOs = await Os.findAll();
    return res.json(listOs.length > 0 ? listOs : 'No hay marcas disponibles');
  } catch (error) {
    return res.json(error);
  }
};

//Trae un producto segun su id
async function getProductById(id) {
  try {
    let product = await getProductsWithDB();

    product = product.filter((e) => e.id == id);

    return product.length
      ? product
      : 'El ID no esta relacionado a ningun producto';
  } catch (error) { }
}

//Trae todos los productos que en su nombre incluyan el name que se busca
async function getProductByName(name) {
  try {
    let product = await Cellphone.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });

    return product.length ? product : 'Product not found';
  } catch (error) {
    return error;
  }
}

//Crea un producto en la base de datos
async function createProduct(req, res) {
  const { name } = req.body;

  try {
    const createCell = await Cellphone.findOrCreate({
      where: { name },
      defaults: { ...req.body },
    });
    createCell
      ? res.json(createCell)
      : res.status(400).json({ error: 'No se pudo crear telefono' });
  } catch (error) {
    res.status(500).json(error);
  }
}

//Trae de la base de datos todos los productos
async function getProductsWithDB() {
  try {
    let DBInfo = await Cellphone.findAll({
      include: [
        { model: Brand },
        { model: Os }]
    });
    if (!DBInfo.length) {
      return 'La base de datos se encuentra vacia.';
    }
    return DBInfo;
  } catch (error) {
    return error;
  }
}

//Crear un usuario.
// async function createUser(user) {
//   try {
//     console.log(user);
//     await Users.create(user);

//     return `${user.name} creado.`;
//   } catch (error) {
//     return error;
//   }
// } //Proceso llevado al controlador de usuarios

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  getListBrands,
  getListOs,
};
