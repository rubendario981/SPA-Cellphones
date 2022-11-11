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
