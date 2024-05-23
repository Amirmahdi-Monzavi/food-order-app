import ReactDOM from "react-dom";

import Card from "../UI/Card";

import classes from "./Modal.module.css";

const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};

const Overlay = ({ children }) => {
  return <Card className={classes.modal}>{children}</Card>;
};

const Modal = ({ children }) => {
  const backdropId = document.getElementById("backdrop");
  const overlayId = document.getElementById("overlay");
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, backdropId)}
      {ReactDOM.createPortal(<Overlay>{children}</Overlay>, overlayId)}
    </>
  );
};

export default Modal;
