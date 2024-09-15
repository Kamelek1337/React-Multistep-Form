import classes from "./FormCell.module.css";
import { useState } from "react";

export default function FormCell({
  errorState,
  emptyInput,
  handleInputChange,
  handleValidation,
  name,
  placeholder,
  type,
  formDataValue,
  label,
}) {
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 600;

  const handleWindowResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handleWindowResize);
  return (
    <div className={classes.formCell}>
      <div className={classes.labelBox}>
        <label>{label}</label>
        {errorState === true ? (
          <span
            className={width <= breakPoint ? classes.mobileError : classes.err}
          >
            Invalid {label}
          </span>
        ) : emptyInput ? (
          <span
            className={width <= breakPoint ? classes.mobileError : classes.err}
          >
            This field is required
          </span>
        ) : (
          ""
        )}
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formDataValue}
        onChange={handleInputChange}
        onBlur={handleValidation}
        className={
          errorState === true
            ? `${classes.formCellInput} ${classes.error}`
            : emptyInput === true
            ? `${classes.formCellInput} ${classes.error}`
            : classes.formCellInput
        }
      />
    </div>
  );
}
