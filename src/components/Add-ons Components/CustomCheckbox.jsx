import { useContext, useEffect, useState } from "react";
import { StepContext } from "../../context/StepbarContext";
import classes from "./CustomCheckbox.module.css";

export default function CustomCheckbox({
  title,
  description,
  price,
  type,
  index,
  handleToggle,
  isChecked,
}) {
  const { setData } = useContext(StepContext);
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 600;

  const handleWindowResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handleWindowResize);

  // Displayed cost in the component
  let cost;

  // Calculate cost based on type (monthly or yearly)
  if (type === true) {
    cost = price * 10;
  } else {
    cost = price;
  }

  // Sending selected options in form of object to data whenever checkbox is toggled
  useEffect(() => {
    const checkedOptionObject = { title, cost, index };

    setData((prevState) => {
      if (isChecked && !prevState.addOns.some((item) => item.title === title)) {
        return {
          ...prevState,
          addOns: [...prevState.addOns, checkedOptionObject],
        };
      } else if (!isChecked) {
        return {
          ...prevState,
          addOns: prevState.addOns.filter((item) => item.title !== title),
        };
      }

      return prevState;
    });
  }, [isChecked]);

  // Updating cost when type (monthly or yearly) changes
  useEffect(() => {
    setData((prevState) => {
      const updatedAddOns = prevState.addOns.map((item) => {
        if (item.title === title) {
          return { ...item, cost };
        }
        return item;
      });

      return { ...prevState, addOns: updatedAddOns };
    });
  }, [type]);

  return (
    <article
      className={
        isChecked === true
          ? `${classes.checkboxWrapper} ${classes.selected}`
          : classes.checkboxWrapper
      }
    >
      <label className={classes.checkboxBg}>
        <article>
          <input
            type="checkbox"
            id="checkbox-input"
            onChange={handleToggle}
            checked={isChecked}
          />
          <div className={classes.description}>
            <span
              style={{
                color: " #02295a",
                fontWeight: "500",
              }}
            >
              {title}
            </span>
            <p
              id={
                width <= breakPoint
                  ? classes["descriptionTextMobile"]
                  : classes["descriptionText"]
              }
            >
              {description}
            </p>
          </div>
        </article>
        <p style={{ color: "#473dff" }}>
          +${cost}/{type === true ? "yr" : "mo"}
        </p>
      </label>
    </article>
  );
}
