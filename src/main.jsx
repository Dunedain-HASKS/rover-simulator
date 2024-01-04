import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div
      style={{ height: "100%", display: "flex", border: "1px solid yellow" }}
    >
      <App />
    </div>
  </React.StrictMode>
);
