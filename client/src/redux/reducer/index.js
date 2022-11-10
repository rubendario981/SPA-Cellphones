const initialState = {
  products: [],
  detail: [],
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

    case "CREATE_PRODUCT":
      return {
        ...state,
        products: state.products.concat(action.payload)
      }

      case 'CLEAN_DETAIL':
        return{
            ...state,
            detail: []
        }

    default:
      return state;
  }
};

export default rootReducer;
