const initialState = {
  products: [],
  detail: [],
  brands: [],
  filtered: [],
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
        filtered: action.payload,
      };
    case "FILTER_PRODUCTS":
      return {
        ...state,
        filtered: state.products.filter((e) => {
          return e.brand === action.payload;
        }),
      };
    case "FILTER_ROM":
      return {
        ...state,
        filtered: state.products.filter((e) => {
          return e.contains(action.payload);
        }),
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
            // products: []
           
        }
        case 'GET_PHONE_BY_ID':
            return{
                ...state,
                detail: action.payload
                // products: action.payload
            }       
//------------------

    default:
      return state;
  }
};

export default rootReducer;
