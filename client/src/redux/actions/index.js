import axios from "axios";
const URL = process.env.REACT_APP_URL || "http://localhost:3001";

export function getProducts() {
  return async (dispatch) => {
    const response = await axios.get(`${URL}/products`);
    return dispatch({
      type: "GET_PRODUCTS",
      payload: response.data,
    });
  };
}

export const getListBrands = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/products/brands`);
      return dispatch({
        type: "LIST_BRANDS",
        payload: response.data,
      });
    } catch (error) {
      console.log("No se pudieron traer las marcas");
    }
  };
};

export const getListOs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/products/os`);
      return dispatch({
        type: "LIST_OS",
        payload: response.data,
      });
    } catch (error) {
      console.log("No se pudieron traer las sistemas operativos");
    }
  };
};

export const createCellPhone = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/products/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return dispatch({
        type: "CREATE_PRODUCT",
        payload: response.data,
      });
    } catch (error) {
      console.log("Error redux action file", error);
    }
  };
};

export const editCellphone = (data) =>{
  return async(dispatch) =>{
    try {
      const updateCell = await axios.patch(`${URL}/products/updateCell`, data);
      return dispatch({
        type: "EDIT_PRODUCT",
        payload: updateCell.data
      })
    } catch (error) {
      console.log("Error redux actions edit cellphone", error);
      return error
      
    }
  }
}

export const createBrand = (data) =>{
  return async(dispatch) =>{
    try {
      const newBrand = await axios.post(`${URL}/products/new-brand`, data)
      return dispatch({
        type: "CREATE_BRAND",
        payload: newBrand.data[0]
      })
    } catch (error) {
      console.log("Error controller creando marca nueva ", error);
      return error
    }
  }
}

export function resetFilter() {
  return { type: "RESET_FILTER" };
}

export function filterBrand(payload) {
  return { type: "FILTER_BRAND", payload };
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
  return async function (dispatch) {
    try {
      // let json = await axios.get(`${URL}/products/${id.id}`)
      // let json = await axios.get("/products/" + id);
      const response = await axios.get(`${URL}/products`);
      const detailProduct = response.data.filter(
        (data) => data.id === parseInt(id)
      );
      return dispatch({
        type: "GET_PHONE_BY_ID",
        payload: detailProduct,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createUser(dataUser) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL}/user/register`, dataUser);
      const token = JSON.stringify(response.data.token);
      localStorage.setItem("token", token);
      return dispatch({
        type: "CREATE_USER",
        payload: response,
      });
    } catch (error) {
      return error;
    }
  };
}

export function login(dataUser) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL}/user/login`, dataUser);
      const token = JSON.stringify(response.data.token);
      localStorage.setItem("token", token);
      console.log("Redux actions login user", response);
      return dispatch({
        type: "LOGIN",
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function getProfile(id) {
  return async function (dispatch) {
    try {
      const profile = await axios.get(`${URL}/user/getProfile?id=${id}`);
      const token = JSON.stringify(profile.data.token);
      console.log("esto trae la acction: ", profile);
      localStorage.setItem("token", token);
      return dispatch({
        type: "GET_PERFIL",
        payload: profile.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export const cerrarSesion = () => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    return dispatch({
      type: "CERRAR_SESION",
    });
  };
};

export const udapteUser = (user) => {
  console.log("Usuario actions", user);
  return async (dispatch) => {
    await axios.patch(`${URL}/user/update/${user.id}`, user);
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const updateUser = await axios.patch(
        `${URL}/user/update/${user.id}`,
        user
      );
      console.log("Respuesta action redux update user", updateUser);
      return dispatch({
        type: "UPDATE_USER",
        payload: updateUser.data,
      });
    } catch (error) {
      console.log("Error action actualizar usuario", error);
      return error;
    }
  };
};
export const resetProducts = (products) => {
  return async (dispatch) => {
    return dispatch({
      type: "RESET_PRODUCTS",
      payload: products,
    });
  };
};
