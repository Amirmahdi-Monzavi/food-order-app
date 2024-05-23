import HeaderCartButton from "./HeaderCartButton";

import classes from "./MainHeader.module.css";
import mealsImg from "../../assets/meals.jpg";

const MainHeader = ({ onShowCart }) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onShowCart={onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="Meals" />
      </div>
    </>
  );
};

export default MainHeader;
