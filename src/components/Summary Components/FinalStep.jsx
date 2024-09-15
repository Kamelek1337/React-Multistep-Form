import ThankYouIcon from "../../assets/images/icon-thank-you.svg";
import classes from "./FinalStep.module.css";
export default function FinalStep() {
  return (
    <article className={classes.finalSummary}>
      <img src={ThankYouIcon} />
      <h2>Thank you!</h2>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loregaming.com
      </p>
    </article>
  );
}
