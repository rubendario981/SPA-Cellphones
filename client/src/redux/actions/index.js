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
