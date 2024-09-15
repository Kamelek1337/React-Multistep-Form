import classes from "./Sidebaritem.module.css";

export default function SidebarItem({ num, name, step, mobileDesign }) {
  return (
    <article className={classes.step}>
      <p
        className={
          step === num ? `${classes.circle} ${classes.checked}` : classes.circle
        }
      >
        <p className={classes.stepNum}>{num === 5 ? num - 1 : num}</p>
      </p>
      {mobileDesign === true ? (
        ""
      ) : (
        <div className={classes.stepBox}>
          <p
            style={{
              fontWeight: "400",
              fontSize: "14px",
              color: "hsla(216, 100%, 97%, 0.582)",
            }}
          >
            STEP {num === 5 ? num - 1 : num}
          </p>
          <p style={{ fontWeight: "800", letterSpacing: "1.5px" }}>{name}</p>
        </div>
      )}
    </article>
  );
}
