import { useReducer } from "react";

import CartContext from "./cart-context";

const initialCart = {
  items: [],
  totalAmount: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  let updatedItems;
  let updatedTotalAmount;
  let updatedTotalPrice;

  if (action.type === "ADD") {
    updatedTotalAmount = state.totalAmount + action.item.amount;
    updatedTotalPrice =
      state.totalPrice + action.item.amount * action.item.price;

    const existingItem = state.items.find((item) => item.id === action.item.id);
    if (existingItem) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const copiedExistingItem = { ...existingItem };
      copiedExistingItem.amount += action.item.amount;

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = copiedExistingItem;

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        totalPrice: updatedTotalPrice,
      };
    } else {
      updatedItems = [...state.items];
      updatedItems = updatedItems.concat(action.item);

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        totalPrice: updatedTotalPrice,
      };
    }
  }

  if (action.type === "REMOVE") {
    const existingItem = state.items.find((item) => item.id === action.id);

    updatedTotalAmount = state.totalAmount - 1;
    updatedTotalPrice = state.totalPrice - existingItem.price;

    if (existingItem.amount > 1) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      const copiedExistingItem = { ...existingItem };
      copiedExistingItem.amount--;

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = copiedExistingItem;

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        totalPrice: updatedTotalPrice,
      };
    } else {
      updatedItems = [...state.items];
      updatedItems = updatedItems.filter((item) => item.id !== action.id);

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        totalPrice: updatedTotalPrice,
      };
    }
  }

  if (action.type === "RESET") {
    return initialCart;
  }
  return initialCart;
};

const CartProvider = ({ children }) => {
  const [cart, disptachCart] = useReducer(cartReducer, initialCart);

  const addItemHandler = (item) => {
    disptachCart({ type: "ADD", item: item });
  };

  const removeItemHandler = (itemId) => {
    disptachCart({ type: "REMOVE", id: itemId });
  };

  const resetCartHandler = () => {
    disptachCart({ type: "RESET" });
  };

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        totalAmount: cart.totalAmount,
        totalPrice: cart.totalPrice,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        resetCart: resetCartHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
