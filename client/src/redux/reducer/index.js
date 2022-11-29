const initialState = {
  allProducts: [],
  showProducts: [],
  filterProducts: [],
  listStorage: [],
  detail: {},
  brands: [],
  os: [],
  user: {},
  historyCarts: [],
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
      return {
        ...state,
        showProducts: action.payload,
        // filterProducts: filterMarca,
      };
    case "FILTER_STORAGE":
      let filterStorage = state.filterProducts.filter((e) => {
        return e.internal_storage.includes(action.payload);
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
    case "EDIT_PRODUCT":
      return {
        ...state,
        showProducts: action.payload
      };
    case "CREATE_BRAND":
      return {
        ...state,
        brands: state.brands.concat(action.payload)
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
        filterProducts: [...state.allProducts],
        showProducts: [...state.allProducts],
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
      console.log("Redux reducer login user", action.payload);
      return {
        ...state,
        user: action.payload.findUser,
        historyCarts: action.payload.findCarts,
      };
    case "GET_PERFIL":
      return {
        ...state,
        user: action.payload.findUser,
        historyCarts: action.payload.findCarts,
      };
    case "UPDATE_USER":
      console.log("Redux reducer uptade user", action.payload);
      return {
        ...state,
        user: action.payload.findUser,
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
    case "LIST_STORAGE":
      const almacenamiento = []
      state.allProducts.map(e => !almacenamiento.includes(e.internal_storage.split("G")[0].trim()) && almacenamiento.push(e.internal_storage.split("G")[0].trim()))
      almacenamiento.sort((a, b)=> b - a).pop()
      return {
        ...state,
        listStorage: almacenamiento
      }
    case "FILTER_BRANDS_CELLS":
      const filterBrands = action.payload.map(e => state.allProducts.filter(cell => cell.brand.name === e))
      return {
        ...state,
        showProducts: filterBrands.flat()
      };
    case "FILTER_STORAGE_CELLS":
      const filterByStorage = action.payload.map(e => state.allProducts.filter(cell => cell.internal_storage.split("G")[0] === e))
      return {
        ...state,
        showProducts: filterByStorage.flat()
      };
    case "FILTER_BY_BRAND_AND_STORAGE":
      console.log("Redux recibiendo payload", action.payload);
      const filterByBrand = action.payload[0].map(e => state.allProducts.filter(cell => cell.brand.name === e))
      const filterByBrandAndStorage = action.payload[1].map(e => filterByBrand.flat().filter(cell => cell.internal_storage.split("G")[0] === e))
      
      return {
        ...state,
        showProducts: filterByBrandAndStorage.flat(Infinity)
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
