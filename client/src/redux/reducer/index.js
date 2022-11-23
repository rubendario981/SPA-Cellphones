const initialState = {
  allProducts: [],
  showProducts: [],
  filterProducts: [],
  detail: {},
  brands: [],
  os: [],
  user: {},
};

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
        filterProducts: action.payload,
      };
    case "LIST_BRANDS":
      return {
        ...state,
        brands: action.payload,
      };
    case "LIST_OS":
      return {
        ...state,
        os: action.payload,
      };
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
        showProducts: state.showProducts.concat(action.payload[0]),
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
    case "CREATE_USER":
      return {
        ...state,
      };
    case "LOGIN":
      return {
        ...state,
      };
    case "GET_PERFIL":
      return {
        ...state,
        user: action.payload,
      };
    case "CERRAR_SESION": // validar si es necesario!!!
      return {
        ...state,
        user: {},
      };
    case "RESET_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload,
        showProducts: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
