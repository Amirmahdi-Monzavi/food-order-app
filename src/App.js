import { useState, useEffect } from "react";

import CartProvider from "./store/CartProvider";

import Cart from "./components/Cart/Cart";
import MainHeader from "./components/Layout/MainHeader";
import Meals from "./components/Meals/Meals";

import useHttp from "./hooks/use-http";

const App = () => {
  const [showCart, setShowCart] = useState(false);
  const [meals, setMeals] = useState([]);

  const { sendRequest: fetchMealsHandler, isLoading, error } = useHttp();

  useEffect(() => {
    fetchMealsHandler(
      {
        url: "https://react-meals-6960d-default-rtdb.firebaseio.com/meals.json",
      },
      (meals) => {
        let transformedMeals = [];
        for (let meal in meals) {
          transformedMeals.push({
            id: meal,
            name: meals[meal].name,
            description: meals[meal].description,
            price: meals[meal].price,
          });
        }
        setMeals(transformedMeals);
      }
    );
  }, [fetchMealsHandler]);

  const hideCartHandler = () => {
    setShowCart(false);
  };

  const showCartHandler = () => {
    setShowCart(true);
  };

  return (
    <CartProvider>
      {showCart && <Cart onHideCart={hideCartHandler} />}
      <MainHeader onShowCart={showCartHandler} />
      <Meals meals={meals} isLoading={isLoading} error={error} />
    </CartProvider>
  );
};

export default App;
