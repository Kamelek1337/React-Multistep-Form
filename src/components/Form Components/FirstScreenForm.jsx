import { useContext, useState, useEffect } from "react";
import { StepContext } from "../../context/StepbarContext";
import FormCell from "./FormCell.jsx";

export default function FirstScreenForm() {
  const { data, setData, setErr, err } = useContext(StepContext);
  // State which is responsible for saving data from inputs
  const [formData, setFormData] = useState({
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
  });

  // Creating regex to validate data from inputs
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+[1-9]\s\d{3}\s\d{3}\s\d{3}$/;
  const nameRegex = /^(?=.*[A-Za-z].*[A-Za-z])\b\w+\s\w+\b$/;

  // Function to handle input change event, updates formData state with new input value
  function handleInputChange(event) {
    event.preventDefault();

    const { name, value } = event.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  //Function to handle any errors in inputs
  function handleValidation() {
    const emailIsInvalid = !emailRegex.test(data.email);
    if (emailIsInvalid && data.email !== "") {
      setErr((prevState) => ({ ...prevState, two: true }));
    } else {
      setErr((prevState) => ({ ...prevState, two: false }));
    }

    const phoneNumberIsInvalid = !phoneRegex.test(data.phoneNumber);
    if (phoneNumberIsInvalid && data.phoneNumber !== "") {
      setErr((prevState) => ({ ...prevState, three: true }));
    } else {
      setErr((prevState) => ({ ...prevState, three: false }));
    }

    const nameIsInvalid = !nameRegex.test(data.name);
    if (nameIsInvalid && data.name !== "") {
      setErr((prevState) => ({ ...prevState, one: true }));
    } else {
      setErr((prevState) => ({ ...prevState, one: false }));
    }
  }

  // Sending data from formData to context and localStorage
  useEffect(() => {
    setData((prevState) => {
      return {
        ...prevState,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      };
    });
    // Save form data to local storage whenever formData changes
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Loading data from localStorage whenever compontent is loaded
  useEffect(() => {
    // Load form data from local storage when the component mounts
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  // Checking if the input is empty
  const emptyName = err.four === true && data.name === "";
  const emptyEmail = err.four === true && data.email === "";
  const emptyNum = err.four === true && data.phoneNumber === "";

  return (
    <form>
      <FormCell
        handleInputChange={handleInputChange}
        handleValidation={handleValidation}
        errorState={err.one}
        emptyInput={emptyName}
        name={"name"}
        label={"Name"}
        type={"text"}
        placeholder={"e.g. Stephen King"}
        formDataValue={formData.name}
      />
      <FormCell
        handleInputChange={handleInputChange}
        handleValidation={handleValidation}
        errorState={err.two}
        emptyInput={emptyEmail}
        name={"email"}
        label={"Email Address"}
        type={"email"}
        placeholder={"e.g. stephenking@lorem.com"}
        formDataValue={formData.email}
      />
      <FormCell
        handleInputChange={handleInputChange}
        handleValidation={handleValidation}
        errorState={err.three}
        emptyInput={emptyNum}
        name={"phoneNumber"}
        label={"Phone number"}
        type={"text"}
        placeholder={"e.g. +1 234 567 890"}
        formDataValue={formData.phoneNumber}
      />
    </form>
  );
}
