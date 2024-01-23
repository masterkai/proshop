export const addDecimal = (num) => {
  const precision = 1e15; // 10的15次方，可以根據需要調整精度
  return Math.round((num * precision) / precision).toFixed(2);
};
export const updateCart = (state) => {
  // Calculate item price
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  // Calculate shipping price(if order is over $100 then free, else $10 shipping)
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
  // Calculate tax price
  state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));
  // Calculate total price
  state.totalPrice =
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice);
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
