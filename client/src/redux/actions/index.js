import axios from "axios";

export function getProducts() {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/products`);
    return dispatch({
      type: "GET_PRODUCTS",
      payload: response.data,
    });
  };
}

export function filterProduct(filtro) {
  return {
    type: "FILTER_PRODUCTS",
    payload: filtro,
  };
}

export const createCellPhone = (cell) =>{
  const data = cell
  return async(dispatch) =>{
    try {
      const response = await axios.post(`http://localhost:3001/products/create`, data)
      return dispatch({
        type: "CREATE_PRODUCT",
        payload: response
      })
      
    } catch (error) {
      console.log('Error redux action file', error);
    }
  }
}

export function cleanDetail(){
  return{
      type: 'CLEAN_DETAIL'
  }
}
export function getProductById(id){
  console.log(id + 'ID ')
return async function (dispatch){
    try {
      // let json = await axios.get(`http://localhost:3001/products/${id.id}`)
      let json = await axios.get('http://localhost:3001/products/' + id)
      return dispatch({
            type: 'GET_PHONE_BY_ID',
            payload: json.data
        })
    } catch (error) {
        console.log(error)
    }
}
}



