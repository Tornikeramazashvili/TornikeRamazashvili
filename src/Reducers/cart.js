const CartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = state.find((item) => item.name === action.product.name);

      if (item) {
        state = state.map((item) =>
          item.id === action.product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
        return state;
      } else {
        return [...state, { ...action.product, quantity: 1 }];
      }
    case "REMOVE_FROM_CART":
      if (action.product.quantity === 1) {
        // empty cart
        return state.filter((i) => i.id !== action.product.id);
      }

      state = state.map((item) => {
        if (item.id === action.product.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      });
    default:
      return state;
  }
};
export { CartReducer };
