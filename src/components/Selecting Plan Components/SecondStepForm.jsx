import ArcadeIcon from "../../assets/images/icon-arcade.svg";
import AdvancedIcon from "../../assets/images/icon-advanced.svg";
import ProIcon from "../../assets/images/icon-pro.svg";
import Option from "./Option";
import Switch from "./Switch";
import { useEffect, useState, useContext } from "react";
import { StepContext } from "../../context/StepbarContext";
import classes from "./SecondStepForm.module.css";

export default function SecondStepForm() {
  const { data, setData } = useContext(StepContext);

  // State responsible for saving type of the plan (Yearly or Monthly)
  const [plan, setPlan] = useState(data.type);
  // State responsible for saving the selected plan name (Arcade, Advanced, Pro)
  const [selectPlan, setSelectPlan] = useState(data.planName);
  // State responsible for saving the selected subscription value (9, 12, 15)
  const [value, setValue] = useState(data.value);

  // Sending data from states to data context and localStorage when type or planName changes
  useEffect(() => {
    setData((prevState) => {
      return {
        ...prevState,
        type: plan,
        planName: selectPlan,
        value: value,
      };
    });

    localStorage.setItem("plan", JSON.stringify(plan));
    localStorage.setItem("selectPlan", JSON.stringify(selectPlan));
    localStorage.setItem("value", JSON.stringify(value));
  }, [selectPlan, plan]);

  // Loading data from localStorage when the component reloads
  useEffect(() => {
    const savedPlan = localStorage.getItem("plan");
    const savedSelectPlan = localStorage.getItem("selectPlan");
    const savedValue = localStorage.getItem("value");

    if (savedPlan !== undefined && savedSelectPlan !== undefined) {
      setPlan(JSON.parse(savedPlan));
      setSelectPlan(JSON.parse(savedSelectPlan));
      setValue(JSON.parse(savedValue));
    }
  }, []);

  return (
    <article className={classes.planBox}>
      <div className={classes.optionBox}>
        <Option
          icon={ArcadeIcon}
          planName={"Arcade"}
          price={9}
          selectedPlan={plan === false ? "mo" : "yr"}
          onClick={setSelectPlan}
          selectPlan={selectPlan}
          setValue={setValue}
        />
        <Option
          icon={AdvancedIcon}
          planName={"Advanced"}
          price={12}
          selectedPlan={plan === false ? "mo" : "yr"}
          onClick={setSelectPlan}
          selectPlan={selectPlan}
          setValue={setValue}
        />
        <Option
          icon={ProIcon}
          planName={"Pro"}
          price={15}
          selectedPlan={plan === false ? "mo" : "yr"}
          onClick={setSelectPlan}
          selectPlan={selectPlan}
          setValue={setValue}
        />
      </div>
      <div className={classes.selectPlan}>
        <div className={classes.selectPlanBox}>
          <h5 id={plan === false ? classes["selected"] : ""}>Monthly</h5>
          <Switch isMonthly={plan} handleToggle={() => setPlan(!plan)} />
          <h5 id={plan && classes.selected}>Yearly</h5>
        </div>
      </div>
    </article>
  );
}
