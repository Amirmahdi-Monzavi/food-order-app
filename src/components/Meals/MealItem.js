import MealItemForm from "./MealItemForm";

import classes from "./MealItem.module.css";

const MealItem = ({ id, name, description, price }) => {
  const fixedPrice = `$${price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <p className={classes.description}>{description}</p>
        <div className={classes.price}>{fixedPrice}</div>
      </div>
      <MealItemForm
        id={id}
        name={name}
        description={description}
        price={price}
      />
    </li>
  );
};

export default MealItem;
