const initialState = {
    listCard: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_PRODUCT":
        const existingProductIndex = state.listCard.findIndex(
          (product) => product.productId === action.payload.productId
        );
  
        if (existingProductIndex !== -1) {
          const updatedListCard = [...state.listCard];
          updatedListCard[existingProductIndex].quantity +=
            action.payload.quantity;
  
          return {
            ...state,
            listCard: updatedListCard,
          };
        } else {
          return {
            ...state,
            listCard: [...state.listCard, action.payload],
          };
        }
      case "DELETE_PRODUCT":
        return {
          ...state,
          listCard: state.listCard.filter(
            (product) => product.productId !== action.payload
          ),
        };
  
      case "UPDATE_CART":
        return {
          ...state,
          listCard: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  