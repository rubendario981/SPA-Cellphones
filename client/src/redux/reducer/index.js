const initialState = {
  products: [],
  detail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
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
