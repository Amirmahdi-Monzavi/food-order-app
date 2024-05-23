import classes from "./Card.module.css";

const Card = ({ className, children }) => {
  const cardClasses = classes.card + " " + className;

  return <section className={cardClasses}>{children}</section>;
};

export default Card;
