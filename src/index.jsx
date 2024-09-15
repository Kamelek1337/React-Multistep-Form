import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import StepContextProvider from "./context/StepbarContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StepContextProvider>
    <App />
  </StepContextProvider>
);
