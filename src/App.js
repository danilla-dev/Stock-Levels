import React, { useContext } from "react";
//Components
import MainStockPage from "./Pages/MainStockPage";
import NewProductPopup from "./components/NewProductPopup";
import NavBar from "./components/NavBar";
// Styles
import "./assets/styles/App.scss";
// Context
import { NewProductFormPopupContext } from "./contexts/NewProductFormPopupContext";

function App() {
  const { isShowed } = useContext(NewProductFormPopupContext);
  return (
    <div className="App">
      <NavBar />
      <MainStockPage />
      {isShowed && <NewProductPopup />}
    </div>
  );
}

export default App;
