const initialState = {
  products: [],
  brands: [],
};

function devolverMarcas(productos) {
  let marcas = productos.map((e) => {
    return e.brand;
  });

  let marcasFiltradas = marcas.filter((item, index) => {
    return marcas.indexOf(item) === index;
  });

  return marcasFiltradas;
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        brands: devolverMarcas(action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;
