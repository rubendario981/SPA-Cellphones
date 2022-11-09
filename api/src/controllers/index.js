const axios = require('axios');

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

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
};
