const initialState = {
  allProducts: [],
  showProducts: [],
  filterProducts: [],
  detail: [],
  brands: [],
  os: []
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

function menorAMayor(a, b) {
  return a.price.split(" ")[0] - b.price.split(" ")[0];
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload,
        showProducts: action.payload,
        filterProducts: action.payload
      };
    case "LIST_BRANDS":
      return {
        ...state,
        brands: action.payload
      }
    case "LIST_OS":
      return {
        ...state,
        os: action.payload
      }
    case "FILTER_BRAND":
      let filterMarca = state.filterProducts.filter((e) => {
        return e.brand === action.payload;
      });
      return {
        ...state,
        showProducts: filterMarca,
        filterProducts: filterMarca,
      };
    case "FILTER_STORAGE":
      let filterStorage = state.filterProducts.filter((e) => {
        return e.internal_storage === action.payload;
      });
      return {
        ...state,
        showProducts: filterStorage,
        filterProducts: filterStorage,
      };
    case "CREATE_PRODUCT":
      return {
        ...state,
        products: state.allProducts.concat(action.payload.data),
      };

    case "CLEAN_DETAIL":
      return {
        ...state,
        detail: [],
        // products: []
      };
    case "GET_PHONE_BY_ID":
      return {
        ...state,
        detail: action.payload,
        // products: action.payload
      };
    //------------------

    case "RESET_FILTER":
      return {
        ...state,
        filterProducts: state.allProducts,
        showProducts: state.allProducts,
      };
    case "GET_NAME":
      return {
        ...state,
        showProducts: state.allProducts.filter((e) => {
          return e.name.toLowerCase().includes(action.payload.toLowerCase());
        }),
      };
    case "PREC_ASC":
      return {
        ...state,
        showProducts: state.filterProducts.slice().sort(menorAMayor),
      };
    case "PREC_DES":
      return {
        ...state,
        showProducts: state.filterProducts.slice().sort(menorAMayor).reverse(),
      };
    default:
      return state;
  }
};

export default rootReducer;
