import classes from "./Switch.module.css";

export default function Switch({ isMonthly, handleToggle }) {
  return (
    <>
      <input
        checked={isMonthly}
        onChange={handleToggle}
        className={classes.reactSwitchCheckbox}
        id={`react-switch-new`}
        type="checkbox"
      />
      <label className={classes.reactSwitchLabel} htmlFor={`react-switch-new`}>
        <span className={classes.reactSwitchButton} />
      </label>
    </>
  );
}
