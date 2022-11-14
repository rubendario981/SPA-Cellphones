const axios = require('axios');
const { Cellphone, Users, Os, Brand } = require('../db.js');
const { Op } = require('sequelize');

//Trae todos los productos de la api y los vuelca a la base de datos
async function getAllProducts() {
  try {
    let products = await getProductsWithDB();
    const brandsCell = []
    const sysOperative = []
    if (typeof products === 'string') {
      products = await axios.get(
        `https://api-celulares-27ad3-default-rtdb.firebaseio.com/.json`
      );
      products = products.data?.map((e) => ({
        id: e.id,
        brand: e.brand,
        name: e.name,
        image: e.image,
        screen: e.screen,
        internal_storage: e.internal_storage,
        font_camera: e.font_camera,
        rear_camera: e.rear_camera,
        cpu: e.cpu,
        ram: e.ram,
        SO: e.SO,
        battery: e.battery,
        color: e.Color,
        price: e.price,
      }));
      
      products.map(e => !brandsCell.includes(e.brand) && brandsCell.push(e.brand))
      products.map(e => !sysOperative.includes(e.SO.trim()) && sysOperative.push(e.SO.trim()))
      
      //Procede a crear las marcas en la base de datos
      brandsCell.sort().map(async (brand) => {
        await Brand.findOrCreate({ where: { name: brand }})
      })

      //Procede a crear los sistemas operativos
      sysOperative.map(async(so)=>{
        await Os.findOrCreate({ where: { name: so}})
      })
      

      await Cellphone.bulkCreate(products);
    }

    return products;
  } catch (error) {
    return error;
  }
}

//Trae un producto segun su id
async function getProductById(id) {
  try {
    let product = await getProductsWithDB();

    product = product.filter((e) => e.id == id);

    return product;

    return product.length
      ? product
      : 'El ID no esta relacionado a ningun producto';
  } catch (error) {}
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
async function createProduct(product) {
  try {
    let [producto, creado] = await Cellphone.findOrCreate({
      where: {
        brand: product.brand,
        name: product.name,
        image: product.image,
        screen: product.screen,
        internal_storage: product.internal_storage,
        font_camera: 'asd',
        rear_camera: product.rear_camera,
        cpu: product.cpu,
        ram: product.ram,
        SO: product.SO,
        battery: product.battery,
        price: product.price,
      },
      defaults: {
        product,
      },
    });

    return creado ? 'Se creo' : 'Ya existe ese celular';
  } catch (error) {
    return error;
  }
}

//Trae de la base de datos todos los productos
async function getProductsWithDB() {
  try {
    let DBInfo = await Cellphone.findAll();
    if (!DBInfo.length) {
      return 'La base de datos se encuentra vacia.';
    }
    return DBInfo;
  } catch (error) {
    return error;
  }
}

//Crear un usuario.
async function createUser(user) {
  try {
    console.log(user);
    await Users.create(user);

    return `${user.name} creado.`;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  createUser,
};
