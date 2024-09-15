import { useContext } from "react";
import { StepContext } from "../context/StepbarContext";
import classes from "./StepBody.module.css";

export default function StepBody({ title, description, form }) {
  const { setStep, step, data, setErr } = useContext(StepContext);

  // Pre validation and setting error when inputs are empty when user wants to move on to the next step
  function handleNextStep() {
    if (data.name !== "" && data.email !== "" && data.phoneNumber !== "") {
      setStep((prevState) => prevState + 1);
      setErr((prevState) => ({ ...prevState, four: false }));
    } else {
      setErr((prevState) => ({ ...prevState, four: true }));
    }
  }

  // Go back to the previous step when user wants to make changes
  function handleGoBack() {
    setStep((prevState) => prevState - 1);
  }

  return (
    <article className={classes.informationBox}>
      <h1>{title}</h1>
      <p>{description}</p>
      {form}
      <div className={classes.buttonBox}>
        <button
          className={
            step > 1
              ? classes.formBackButton
              : `${classes.formBackButton} ${classes.disabled}`
          }
          onClick={handleGoBack}
        >
          Go Back
        </button>

        <button
          type="submit"
          className={
            step === 4
              ? `${classes.formSubmitButton} ${classes.confirm}`
              : classes.formSubmitButton
          }
          onClick={handleNextStep}
        >
          {step === 4 ? "Confirm" : "Next Step"}
        </button>
      </div>
    </article>
  );
}
