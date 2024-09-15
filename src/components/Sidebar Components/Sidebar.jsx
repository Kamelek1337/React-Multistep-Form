import SidebarItem from "./SidebarItem";
import { StepContext } from "../../context/StepbarContext";
import { useContext, useState } from "react";
export default function Sidebar() {
  const { step } = useContext(StepContext);
  const [width, setWidth] = useState(window.innerWidth);
  const breakPoint = 600;

  const handleWindowResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handleWindowResize);

  return (
    <aside className={width <= breakPoint ? "sidebarMobile" : "sidebar"}>
      <SidebarItem
        name={"YOUR INFO"}
        num={1}
        step={step}
        mobileDesign={width <= breakPoint ? true : false}
      />
      <SidebarItem
        name={"SELECT PLAN"}
        num={2}
        step={step}
        mobileDesign={width <= breakPoint ? true : false}
      />
      <SidebarItem
        name={"ADD-ONS"}
        num={3}
        step={step}
        mobileDesign={width <= breakPoint ? true : false}
      />
      {step > 4 ? (
        <SidebarItem
          name={"SUMMARY"}
          num={5}
          step={step}
          mobileDesign={width <= breakPoint ? true : false}
        />
      ) : (
        <SidebarItem
          name={"SUMMARY"}
          num={4}
          step={step}
          mobileDesign={width <= breakPoint ? true : false}
        />
      )}
    </aside>
  );
}
