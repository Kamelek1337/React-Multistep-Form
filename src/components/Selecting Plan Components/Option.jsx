import classes from "./Option.module.css";
import { useState } from "react";
export default function Option({
  icon,
  planName,
  price,
  selectedPlan,
  onClick,
  selectPlan,
  setValue,
}) {
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 600;

  const handleWindowResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handleWindowResize);
  // Calculate the price based on the selected plan (monthly or yearly)
  let value;

  // Checks if the selected plan is yearly or monthly and calculates the price based on selected plan
  if (selectedPlan === "yr") {
    value = price * 10;
  } else {
    value = price;
  }

  // Sends price and planName to the parent component
  function handleSelect(planName, price) {
    onClick(planName);
    setValue(price);
  }

  return (
    <div
      className={
        selectPlan === planName
          ? `${classes.option} ${classes.select}`
          : classes.option
      }
      onClick={() => handleSelect(planName, price)}
    >
      <img src={icon} alt="" />
      <article className={classes.details}>
        <h4>{planName}</h4>
        <p>
          ${value}/{selectedPlan}
        </p>
        {selectedPlan === "yr" && (
          <p id={width <= breakPoint ? classes["yearly"] : ""}>2 months free</p>
        )}
      </article>
    </div>
  );
}
