import { useContext } from "react";
import { StepContext } from "../../context/StepbarContext";
import classes from "./Summary.module.css";

export default function Summary() {
  const { data, setStep } = useContext(StepContext);

  // Final,displayed type of the plan
  let type;
  //  Calculated total cost of the plan with add-ons included
  let total;
  // Calculate the total cost of add-ons
  let totalAddOns = data.addOns.reduce((sum, addOn) => sum + addOn.cost, 0);

  // Determine the final type of the plan and calculate the total cost of the plan with add-ons included
  if (data.type === true) {
    type = "Yearly";
    total = data.value * 10 + totalAddOns;
  } else {
    type = "Monthly";
    total = data.value + totalAddOns;
  }

  // Sort the add-ons based on their index in the array for better display
  data.addOns.sort((a, b) => a.index - b.index);

  // Function to handle the "Change Plan" button click event
  function handleChange() {
    setStep(2);
  }

  return (
    <div className={classes.summary}>
      <article className={classes.summarySelectedPlan}>
        <div className={classes.summaryPlanName}>
          <span id={classes["planName"]}>
            {data.planName} ({type})
          </span>
          <p className={classes.changePlan} onClick={handleChange}>
            Change
          </p>
        </div>
        <p id={classes["summaryPlanPrice"]}>
          ${type === "Yearly" ? data.value * 10 : data.value}/
          {type === "Yearly" ? "yr" : "mo"}
        </p>
      </article>
      <article className={classes.selectedAddOns}>
        <ul>
          {data.addOns.map((item) => (
            <li key={item.index}>
              <p className={classes.addOnsTitle}>{item.title}</p>
              <p id={classes["addOnsCost"]}>
                +${item.cost}/{data.type === true ? "yr" : "mo"}
              </p>
            </li>
          ))}
        </ul>
      </article>
      <article className={classes.totalPrice}>
        <p className={classes.totalLabel}>
          Total(per {data.type === true ? "year" : "month"})
        </p>
        <p id={classes["totalValue"]}>
          +${total}/{data.type === true ? "yr" : "mo"}
        </p>
      </article>
    </div>
  );
}
