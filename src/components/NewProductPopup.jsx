import React, { useState, useContext } from "react";
// Components
// Styles
import "../assets/styles/NewProductPopup.scss";
// Contexts
import { NewProductFormPopupContext } from "../contexts/NewProductFormPopupContext";

// Lib
// DB
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { database } from "../database/firebaseConfig";
import { set, ref as DBref } from "firebase/database";
// Icons
import { MdOutlineDataSaverOn, MdOutlineCancel } from "react-icons/md";

const NewProductFormActionButtons = ({
  formData,
  selectedFile,
  handleSaveProduct,
}) => {
  const { toggleShowPopup } = useContext(NewProductFormPopupContext);

  const saveImageInStorage = (e) => {
    e.preventDefault();
    const storage = getStorage();
    const storageRef = ref(storage, "dzbanki/" + formData.id);
    uploadBytes(storageRef, selectedFile)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        console.log("URL przesłanego pliku:", downloadURL);
        handleSaveProduct(downloadURL);
        toggleShowPopup();
      })
      .catch((error) => {
        console.error("Błąd podczas przesyłania pliku:", error);
      });
  };

  return (
    <div className="new-product-form__actions-buttons">
      <button
        onClick={saveImageInStorage}
        className="new-product-form__actions-buttons-save"
      >
        <MdOutlineDataSaverOn />
      </button>
      <button
        onClick={toggleShowPopup}
        className="new-product-form__actions-buttons-cancel"
      >
        <MdOutlineCancel />
      </button>
    </div>
  );
};

const NewProductForm = ({ handleShowPopup }) => {
  const [formData, setFormData] = useState({
    id: "",
    img: "",
    stockLevel: "",
  });
  const [selectedFile, setSelectedFile] = useState();

  const handleFormOnChange = (e) => {
    const { value, name, files } = e.target;
    const file = files && files[0];
    const imageURL = files && URL.createObjectURL(file);
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "img" ? imageURL : value,
    }));
    setSelectedFile(file);
  };

  const handleSaveProduct = (imgURL) => {
    const { id, stockLevel } = formData;
    set(DBref(database, `products/` + id), {
      id,
      img: imgURL,
      stockLevel,
    });
  };

  return (
    <form className="new-product-form">
      <label htmlFor="id">Product ID:</label>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleFormOnChange}
        className="new-product-form__id-input"
        placeholder="Product ID"
      />
      <label htmlFor="stockLevel">Initial stock level:</label>
      <input
        type="number"
        name="stockLevel"
        value={formData.stockLevel}
        onChange={handleFormOnChange}
        className="new-product-form__stock-level-input"
        placeholder="Stock Level"
      />
      <label htmlFor="img">Select image</label>
      <input
        type="file"
        name="img"
        className="new-product-form__image-input"
        onChange={handleFormOnChange}
      />
      {formData.img && (
        <span className="new-product-form__image-preview">
          <img src={formData.img} alt="" />
        </span>
      )}
      <NewProductFormActionButtons
        formData={formData}
        selectedFile={selectedFile}
        handleSaveProduct={handleSaveProduct}
      />
    </form>
  );
};

const NewProductPopup = () => {
  return (
    <div className="new-product-popup">
      <NewProductForm />
    </div>
  );
};

export default NewProductPopup;
