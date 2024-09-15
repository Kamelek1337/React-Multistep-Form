import { createContext, useState } from "react";

export const StepContext = createContext();

export default function StepContextProvider({ children }) {
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    planName: "Arcade",
    type: false,
    value: 9,
    addOns: [],
    select: { one: false, two: false, three: false },
    index: 0,
  });

  const [err, setErr] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  return (
    <StepContext.Provider value={{ step, setStep, setData, data, setErr, err }}>
      {children}
    </StepContext.Provider>
  );
}
