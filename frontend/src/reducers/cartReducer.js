export function cartReducer(state, action) {
  switch (action.type) {
    case "SET_CART":
      return action.payload;
    case "ADD_TO_CART": {
      const newItem = action.payload;
      let newState = { ...state, cartItems: [...state.cartItems] };

      const existingItemIndex = newState.cartItems.findIndex(
        (item) =>
          item.documentId === newItem.documentId &&
          item.selectedColor.documentId === newItem.selectedColor.documentId &&
          item.selectedSize.documentId === newItem.selectedSize.documentId
      );

      if (existingItemIndex >= 0) {
        const updatedItem = {
          ...newState.cartItems[existingItemIndex],
          quantity:
            newState.cartItems[existingItemIndex].quantity + newItem.quantity,
        };
        newState.cartItems[existingItemIndex] = updatedItem;
      } else {
        newState.cartItems = [
          ...newState.cartItems,
          { ...newItem, quantity: newItem.quantity },
        ];
      }

      newState.totalQuantity = newState.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      newState.totalAmount = newState.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return newState;
    }
    case "REMOVE_FROM_CART": {
      const { id, colorId, sizeId } = action.payload;
      const newState = { ...state };

      newState.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item.documentId === id &&
            item.selectedColor.documentId === colorId &&
            item.selectedSize.documentId === sizeId
          )
      );

      newState.totalQuantity = newState.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      newState.totalAmount = newState.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return newState;
    }
    case "UPDATE_CART_ITEM_QUANTITY": {
      const { id, colorId, sizeId, quantity } = action.payload;
      let newState = { ...state, cartItems: [...state.cartItems] };

      const itemIndex = newState.cartItems.findIndex(
        (item) =>
          item.documentId === id &&
          item.selectedColor.documentId === colorId &&
          item.selectedSize.documentId === sizeId
      );

      if (itemIndex >= 0) {
        const updatedItem = {
          ...newState.cartItems[itemIndex],
          quantity: quantity,
        };
        newState.cartItems[itemIndex] = updatedItem;
      }

      newState.totalQuantity = newState.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      newState.totalAmount = newState.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return newState;
    }
    case "CLEAR_CART":
      return { ...state, cartItems: [], totalQuantity: 0, totalAmount: 0 };
    default:
      return state;
  }
}
