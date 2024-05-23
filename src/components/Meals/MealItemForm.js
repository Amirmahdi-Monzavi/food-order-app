import { useRef, useContext } from "react";

import CartContext from "../../store/cart-context";

import Input from "../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = ({ id, name, description, price }) => {
  const inputRef = useRef();
  const cartCtx = useContext(CartContext);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const amount = +inputRef.current.value;
    if (amount > 0) {
      cartCtx.addItem({
        id,
        name,
        description,
        price,
        amount,
      });
      inputRef.current.value = "1";
    } else {
      return;
    }
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <Input ref={inputRef} />
      <button>+Add</button>
    </form>
  );
};

export default MealItemForm;
