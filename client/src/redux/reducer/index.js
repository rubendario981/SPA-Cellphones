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
    case "FILTER_BRANDS":
      return {
        ...state,
        filtered: state.filtered.filter((e) => {
          return e.brand === action.payload;
        }),
      };
    case "FILTER_STORAGE":
      return {
        ...state,
        filtered: state.filtered.filter((e) => {
          return e.internal_storage === action.payload;
        }),
      };
    case "FILTER_PRUEBA":
      let aux = state.products;
      console.log("aux :", action.payload.almacenamiento[0]);

      if (action.payload.marca[0] !== "") {
        aux = aux.filter((e) => e.brand === action.payload.marca[0]);
      }

      // if (action.payload.almacenamiento[0] !== "") {
      //   aux2 = aux.filter(
      //     (e) => e.internal_storage === action.payload.almacenamiento[0]
      //   );
      // }

      console.log(aux);
      aux = state.products.filter((e) => {
        if (e.brand === action.payload.marca) {
          if (
            e.internal_storage === action.payload.almacenamiento &&
            action.payload.almacenamiento !== ""
          ) {
            return e;
          }
        }
      });

      return {
        ...state,
        filtered: aux,
      };

    case "CREATE_PRODUCT":
      return {
        ...state,
        products: state.products.concat(action.payload),
      };

    case "CLEAN_DETAIL":
      return {
        ...state,
        detail: [],
      };

    case "RESET_FILTER":
      return {
        ...state,
        filtered: state.products,
      };

    default:
      return state;
  }
};

export default rootReducer;
