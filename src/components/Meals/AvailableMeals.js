import MealItem from "./MealItem";

import Card from "../UI/Card";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = ({ meals, isLoading, error }) => {
  let content = <p className={classes.fallback}>Nothing here yet!</p>;

  if (meals.length) {
    content = (
      <Card className={classes.meals}>
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    );
  }

  if (error) {
    content = <p className={classes.error}>{error}</p>;
  }

  if (isLoading) {
    content = <p className={classes.fallback}>Loading...</p>;
  }

  return content;
};

export default AvailableMeals;
