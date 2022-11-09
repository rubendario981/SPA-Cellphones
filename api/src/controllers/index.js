const axios = require('axios');
const { Cellphone } = require('../db.js');

async function getAllProducts() {
  try {
    let ApiInfo = await axios.get(
      `https://api-celulares-27ad3-default-rtdb.firebaseio.com/.json`
    );

    return ApiInfo.data;
  } catch (error) {
    return error;
  }
}

async function getProductById(id) {
  let ApiInfo = await axios.get(
    `https://api-celulares-27ad3-default-rtdb.firebaseio.com/.json`
  );

  let product = ApiInfo.data.filter((e) => e.id === id);

  return product.length
    ? product
    : 'El ID no esta relacionado a ningun producto';
}

async function getProductByName(name) {
  try {
    let ApiInfo = await axios.get(
      `https://api-celulares-27ad3-default-rtdb.firebaseio.com/.json`
    );

    let product = ApiInfo.data.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );

    return product.length ? product : 'Product not found';
  } catch (error) {
    return error;
  }
}

async function createProduct(product) {
  try {
    let [producto, creado] = await Cellphone.findOrCreate({
      where: {
        name: product.name,
        image: product.image,
        cpu: product.cpu,
        ram: product.ram,
        screen: product.screen,
        price: product.price,
        front_camera: product.front_camera,
        rear_camera: product.rear_camera,
        internal_storage: product.internal_storage,
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

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
};
