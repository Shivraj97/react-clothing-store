import { createSelector } from "reselect";

//Input Selector
const selectCart = (state) => state.cart;

//Output Selector
export const selectCartItems = createSelector(
  //Array of Input Selector
  [selectCart],
  (cart) => cart.cartItems
);

//Output Selector
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
