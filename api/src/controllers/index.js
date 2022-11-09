const axios = require('axios');


function getProductById() {} 

async function getAllProducts() {
  try {
    let ApiUrl = await axios.get(
      `https://api-celulares-27ad3-default-rtdb.firebaseio.com/.json`
    );
    let ApiInfo = await ApiUrl.data.map((el)=>{
      return{
        id: el.id,
        image: el.image,
        name: el.name,
        brand: el.brand,
        cpu: el.cpu,

      }
    })
    console.log(ApiInfo)
    return ApiInfo;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
};
