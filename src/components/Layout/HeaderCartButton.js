import { useContext, useEffect, useState } from "react";

import CartContext from "../../store/cart-context";

import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";

let isAllowdToBump = false;

const HeaderCartButton = ({ onShowCart }) => {
  const [bump, setBump] = useState(false);

  const cartCtx = useContext(CartContext);
  const items = cartCtx.items;

  useEffect(() => {
    if (!isAllowdToBump) {
      isAllowdToBump = true;
      return;
    }

    const timer = setTimeout(() => {
      setBump(true);
    }, 100);

    return () => {
      setBump(false);
      clearTimeout(timer);
    };
  }, [items]);

  let buttonClasses = classes.button;
  if (bump) {
    buttonClasses = buttonClasses + " " + classes.bump;
  }

  return (
    <button className={buttonClasses} onClick={onShowCart}>
      <div className={classes.icon}>
        <CartIcon />
      </div>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartCtx.totalAmount}</span>
    </button>
  );
};

export default HeaderCartButton;
