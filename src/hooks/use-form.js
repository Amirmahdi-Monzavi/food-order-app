import { useReducer } from "react";

const initialInputValues = {
  value: "",
  isTouched: false,
};

const inputReducer = (state, action) => {
  if (action.type === "CHANGE") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return initialInputValues;
  }

  return initialInputValues;
};

const useForm = (validateValue) => {
  const [input, dispatchInput] = useReducer(inputReducer, initialInputValues);

  const inputIsValid = validateValue(input.value);
  const inputIsInvalid = !inputIsValid && input.isTouched;

  const inputValueChangeHandler = (event) => {
    dispatchInput({ type: "CHANGE", value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatchInput({ type: "BLUR" });
  };

  const resetInput = () => {
    dispatchInput({ type: "RESET" });
  };

  return {
    value: input.value,
    inputIsValid,
    inputIsInvalid,
    inputValueChangeHandler,
    inputBlurHandler,
    resetInput,
  };
};

export default useForm;
