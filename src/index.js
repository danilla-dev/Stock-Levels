import React from "react";
import ReactDOM from "react-dom/client";
// Components
import App from "./App";
// Styles
import "./assets/styles/index.scss";
// Contexts
import NewProductFormPopupProvider from "./contexts/NewProductFormPopupContext";

// Lib
// DB
// Icons

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NewProductFormPopupProvider>
      <App />
    </NewProductFormPopupProvider>
  </React.StrictMode>
);

// Components
// Styles
// Contexts
// Lib
// DB
// Icons
