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
export function cleanDetail(){
  return{
      type: 'CLEAN_DETAIL'
  }
}
export function getProductById(id){
return async function (dispatch){
    try {
        let json = await axios.get(`http://localhost:3001/products/${id.id}`)
        return dispatch({
            type: 'GET_POKE_BY_ID',
            payload: json.data
        })
    } catch (error) {
        console.log(error)
    }
}
}

