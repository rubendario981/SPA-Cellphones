const axios = require('axios');

async function getAllProducts() {
  try {
    let ApiInfo = await axios.get(
      `https://api-celulares-27ad3-default-rtdb.firebaseio.com/.json`
    );
    console.log(ApiInfo);
    return ApiInfo.data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllProducts,
};
