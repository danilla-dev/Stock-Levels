import React, { createContext, useState } from "react";

export const NewProductFormPopupContext = createContext();

const NewProductFormPopupProvider = ({ children }) => {
  const [isShowed, setIsShowed] = useState(false);

  const toggleShowPopup = () => {
    setIsShowed((prevState) => !prevState);
  };

  return (
    <NewProductFormPopupContext.Provider value={{ isShowed, toggleShowPopup }}>
      {children}
    </NewProductFormPopupContext.Provider>
  );
};

export default NewProductFormPopupProvider;
