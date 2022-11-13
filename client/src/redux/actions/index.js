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

export const getListBrands = () =>{
  return async (dispatch) =>{
    try {
      const response = await axios.get(`http://localhost:3001/products/brands`);
      return dispatch({
        type: "LIST_BRANDS",
        payload: response.data
      })
    } catch (error) {
      console.log("No se pudieron traer las marcas");
    }
  }
}

export const getListOs = () =>{
  return async (dispatch) =>{
    try {
      const response = await axios.get(`http://localhost:3001/products/os`);
      return dispatch({
        type: "LIST_OS",
        payload: response.data
      })
    } catch (error) {
      console.log("No se pudieron traer las sistemas operativos");
    }
  }
}

export const createCellPhone = (cell) => {
  const data = cell;
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/products/create`,
        data
      );
      return dispatch({
        type: "CREATE_PRODUCT",
        payload: response,
      });
    } catch (error) {
      console.log("Error redux action file", error);
    }
  };
};

export function resetFilter() {
  return { type: "RESET_FILTER" };
}

export function filterBrand(marca) {
  if (marca !== "") return { type: "FILTER_BRAND", payload: marca };
}

export function filterStorage(storage) {
  if (storage !== "") return { type: "FILTER_STORAGE", payload: storage };
}

export function getProductByName(name) {
  return { type: "GET_NAME", payload: name };
}

export function ordenar(orden) {
  return { type: orden };
}
export function cleanDetail() {
  return {
    type: "CLEAN_DETAIL",
  };
}
export function getProductById(id) {
  console.log(id + "ID ");
  return async function (dispatch) {
    try {
      // let json = await axios.get(`http://localhost:3001/products/${id.id}`)
      let json = await axios.get("http://localhost:3001/products/" + id);
      return dispatch({
        type: "GET_PHONE_BY_ID",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
