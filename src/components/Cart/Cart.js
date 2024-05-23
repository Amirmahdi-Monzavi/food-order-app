import { useContext, useState } from "react";

import CartContext from "../../store/cart-context";

import CartItem from "./CartItem";
import Checkout from "./Checkout";

import Modal from "../UI/Modal";

import useHttp from "../../hooks/use-http";

import classes from "./Cart.module.css";

const Cart = ({ onHideCart }) => {
  const [checkoutIsShown, setCheckoutIsShown] = useState(false);
  const [orderIsReceived, setOrderIsReceived] = useState(false);

  const { sendRequest: sendCart, isLoading, error } = useHttp();

  const cartCtx = useContext(CartContext);
  const items = cartCtx.items;
  const fixedTotalPrice = `$${cartCtx.totalPrice.toFixed(2)}`;

  const removeItemHandler = (item) => {
    cartCtx.removeItem(item.id);
    if (item.amount === 1) {
      setCheckoutIsShown(false);
    }
  };

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const showCheckoutFormHandler = () => {
    setCheckoutIsShown(true);
  };

  const sendCartHandler = (cart) => {
    sendCart(
      {
        url: "https://react-meals-6960d-default-rtdb.firebaseio.com/customers.json",
        method: "POST",
        body: cart,
        headers: {
          "Content-Type": "application/json",
        },
      },
      (data) => {
        if (data) {
          setOrderIsReceived(true);
          cartCtx.resetCart();
        }
      }
    );
  };

  let cartContent;

  if (items.length > 0) {
    cartContent = (
      <ul className={classes["cart-items"]}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={removeItemHandler.bind(null, item)}
            onAdd={addItemHandler.bind(null, item)}
          />
        ))}
      </ul>
    );
  } else {
    cartContent = <p className={classes.fallback}>Your cart is empty</p>;
  }

  let modalContent = (
    <>
      {cartContent}
      <div className={classes.total}>
        <div>Total Price</div>
        <div>{fixedTotalPrice}</div>
      </div>
      <div className={classes.actions}>
        {items.length > 0 && !checkoutIsShown && (
          <button className={classes.button} onClick={showCheckoutFormHandler}>
            Order
          </button>
        )}
        {!checkoutIsShown && (
          <button className={classes["button--alt"]} onClick={onHideCart}>
            Cancel
          </button>
        )}
      </div>
      {checkoutIsShown && items.length > 0 && (
        <Checkout onClose={onHideCart} onSendCart={sendCartHandler} />
      )}
    </>
  );

  if (isLoading) {
    modalContent = <p className={classes.fallback}>Loading...</p>;
  }

  if (error) {
    modalContent = (
      <>
        <p className={classes.error}>Something went wrong!</p>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={onHideCart}>
            Close
          </button>
        </div>
      </>
    );
  }

  if (!isLoading && error === null && orderIsReceived) {
    modalContent = (
      <>
        <p className={classes.fallback}>Order received successfully!</p>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={onHideCart}>
            Close
          </button>
        </div>
      </>
    );
  }

  return <Modal>{modalContent}</Modal>;
};

export default Cart;
