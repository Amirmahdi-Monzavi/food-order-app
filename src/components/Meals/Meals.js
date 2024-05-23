import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

const Meals = ({ meals, isLoading, error }) => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals meals={meals} isLoading={isLoading} error={error} />
    </>
  );
};

export default Meals;
