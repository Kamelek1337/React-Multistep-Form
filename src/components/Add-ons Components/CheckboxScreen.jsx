import CustomCheckbox from "./CustomCheckbox";
import { useContext, useState, useEffect } from "react";
import { StepContext } from "../../context/StepbarContext";

export default function CheckboxScreen() {
  const { setData, data } = useContext(StepContext);

  //State resposible for setting which checkbox is checked
  const [selected, setSelected] = useState({
    one: data.select.one,
    two: data.select.two,
    three: data.select.three,
  });

  // Function which is toggling the chechbox value when it is clicked
  function handleToggle(num) {
    if (num == "one") {
      setSelected((prevState) => {
        return {
          ...prevState,
          one: !selected.one,
        };
      });
    } else if (num == "two") {
      setSelected((prevState) => {
        return {
          ...prevState,
          two: !selected.two,
        };
      });
    } else {
      setSelected((prevState) => {
        return {
          ...prevState,
          three: !selected.three,
        };
      });
    }
  }

  // Sending data to context and localStorage when state changes
  useEffect(() => {
    setData((prevState) => {
      return {
        ...prevState,
        select: {
          one: selected.one,
          two: selected.two,
          three: selected.three,
        },
      };
    });

    localStorage.setItem("checkboxOne", JSON.stringify(selected));
  }, [selected]);

  // Load data from localStorage to state
  useEffect(() => {
    const savedCheckboxOne = localStorage.getItem("checkboxOne");
    if (savedCheckboxOne) {
      setSelected(JSON.parse(savedCheckboxOne));
    }
  }, []);

  return (
    <article className="checkbox-box">
      <CustomCheckbox
        title="Online service"
        description={"Access to multiplayer games"}
        price={1}
        type={data.type}
        index={1}
        handleToggle={() => handleToggle("one")}
        isChecked={selected.one}
      />
      <CustomCheckbox
        title="Larger storage"
        description={"Extra 1TB of cloud save"}
        price={2}
        type={data.type}
        index={2}
        handleToggle={() => handleToggle("two")}
        isChecked={selected.two}
      />
      <CustomCheckbox
        title="Customizable profile"
        description={"Custom theme on your profile"}
        price={2}
        type={data.type}
        index={3}
        handleToggle={() => handleToggle("three")}
        isChecked={selected.three}
      />
    </article>
  );
}
