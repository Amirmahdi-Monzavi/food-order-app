import { useContext } from "react";

import CartContext from "../../store/cart-context";

import useForm from "../../hooks/use-form";

import classes from "./Checkout.module.css";

const Checkout = ({ onClose, onSendCart }) => {
  const cartCtx = useContext(CartContext);

  const {
    value: name,
    inputIsValid: nameIsValid,
    inputIsInvalid: nameIsInvalid,
    inputValueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    resetInput: resetName,
  } = useForm((name) => name.trim().length > 0);

  const {
    value: street,
    inputIsValid: streetIsValid,
    inputIsInvalid: streetIsInvalid,
    inputValueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    resetInput: resetStreet,
  } = useForm((street) => street.trim().length > 0);

  const {
    value: postalCode,
    inputIsValid: postalCodeIsValid,
    inputIsInvalid: postalCodeIsInvalid,
    inputValueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    resetInput: resetPostalCode,
  } = useForm((postalCode) => postalCode.trim().length === 8);

  const {
    value: city,
    inputIsValid: cityIsValid,
    inputIsInvalid: cityIsInvalid,
    inputValueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    resetInput: resetCity,
  } = useForm((city) => city.trim().length > 0);

  let formIsValid = false;

  if (nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    nameBlurHandler();
    streetBlurHandler();
    postalCodeBlurHandler();
    cityBlurHandler();

    if (!formIsValid) {
      return;
    }

    onSendCart({
      name,
      street,
      postalCode,
      city,
      cart: cartCtx.items,
    });

    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();
  };

  const nameClasses = nameIsInvalid
    ? classes.control + " " + classes.invalid
    : classes.control;
  const streetClasses = streetIsInvalid
    ? classes.control + " " + classes.invalid
    : classes.control;
  const postalCodeClasses = postalCodeIsInvalid
    ? classes.control + " " + classes.invalid
    : classes.control;
  const cityClasses = cityIsInvalid
    ? classes.control + " " + classes.invalid
    : classes.control;

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={name}
        />
        {nameIsInvalid && <p className={classes.error}>Enter a valid name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={street}
        />
        {streetIsInvalid && (
          <p className={classes.error}>Enter a valid street.</p>
        )}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
          value={postalCode}
        />
        {postalCodeIsInvalid && (
          <p className={classes.error}>Enter a valid postal code.</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={city}
        />
        {cityIsInvalid && <p className={classes.error}>Enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
