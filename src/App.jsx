import Sidebar from "./components/Sidebar Components/Sidebar.jsx";
import StepBody from "./components/StepBody.jsx";
import FirstScreenForm from "./components/Form Components/FirstScreenForm.jsx";
import SecondStepForm from "./components/Selecting Plan Components/SecondStepForm.jsx";
import CheckboxScreen from "./components/Add-ons Components/CheckboxScreen.jsx";
import Summary from "./components/Summary Components/Summary.jsx";
import FinalStep from "./components/Summary Components/FinalStep.jsx";
import { useContext } from "react";
import { StepContext } from "./context/StepbarContext";

function App() {
  const { step, setStep } = useContext(StepContext);

  let content;

  // If statement which is responsible for displaying right step of the form //
  if (step <= 1) {
    content = (
      <StepBody
        title={"Personal info"}
        description={
          "Please provide your name, email address, and phone number."
        }
        form={<FirstScreenForm />}
      />
    );
    setStep(1);
  } else if (step === 2) {
    content = (
      <StepBody
        title={"Select your plan "}
        description={"You have the option of monthly or yearly billing."}
        form={<SecondStepForm />}
      />
    );
  } else if (step === 3) {
    content = (
      <StepBody
        title={"Pick add-ons"}
        description={"Add-ons help enhance your gaming expierience"}
        form={<CheckboxScreen />}
      />
    );
  } else if (step === 4) {
    content = (
      <StepBody
        title={"Finishing up"}
        description={"Double-check everything looks OK before confirming"}
        form={<Summary />}
      />
    );
  } else {
    content = <FinalStep />;
  }

  return (
    <div className="container">
      <main>
        <Sidebar />
        {content}
      </main>
    </div>
  );
}

export default App;
