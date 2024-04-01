import React, { useState } from "react";
// Components
// Styles
import "../assets/styles/Product.scss";
// Contexts
// Lib
// DB
import { ref, set } from "firebase/database";
import { database } from "../database/firebaseConfig";
// Icons
import { FaPlusSquare, FaMinusSquare, FaCheckSquare } from "react-icons/fa";

const ProductActionsButtons = ({ quantity, handleSetQuantity }) => {
  return (
    <div className="product__actions-buttons">
      <button
        name="+"
        className="increase-button"
        onClick={() => handleSetQuantity("+")}
      >
        <FaPlusSquare />
      </button>
      {quantity > 0 && (
        <button
          name="-"
          className="reduce-button"
          onClick={() => handleSetQuantity("-")}
        >
          <FaMinusSquare />
        </button>
      )}
    </div>
  );
};

const ProductStockLevel = ({
  quantity,
  isEditing,
  handleToggleEdit,
  handleSetNewQuantity,
  handleSaveInDB,
}) => {
  const [newQuantity, setNewQuantity] = useState(quantity);

  const handleInputChange = (e) => {
    setNewQuantity(parseInt(e.target.value));
  };

  const saveNewQuantity = () => {
    handleSetNewQuantity(newQuantity);
    handleToggleEdit();
    handleSaveInDB("user", newQuantity);
  };

  return (
    <div className="product__stock-level">
      <p>Stock level:</p>
      {/* Input just showed only when user click on quantity of product */}
      {isEditing ? (
        <div className="quantity-input">
          <input
            type="number"
            className="quantity-input__input"
            value={newQuantity}
            onChange={handleInputChange}
          />
          <button
            className="quantity-input__accept-button"
            onClick={saveNewQuantity}
          >
            <FaCheckSquare />
          </button>
        </div>
      ) : (
        <span onClick={handleToggleEdit}>{quantity}</span>
      )}
    </div>
  );
};

const ProductImage = ({ srcImage, id }) => {
  return (
    <div className="product__image">
      <img src={srcImage} alt={`Photo of ${id} product.`} />
    </div>
  );
};

const Product = ({ id, stockLevel, img }) => {
  const [quantity, setQuantity] = useState(stockLevel || 0);
  const [isEditing, setIsEditing] = useState(false);

  // Quantity update depending on user selection. ONLY IN COMPONENT
  const handleSetQuantity = (action) => {
    const newQuantity = action === "+" ? quantity + 1 : quantity - 1;
    setQuantity(newQuantity);
    handleSaveInDB(action, newQuantity);
  };

  const handleToggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };
  // Quantity update in DB depending on user selection. Added +1 and -1 by component state update
  const handleSaveInDB = (action, newValue) => {
    set(ref(database, "products/" + id), {
      id,
      stockLevel:
        action === "user"
          ? newValue
          : action === "+"
          ? quantity + 1
          : quantity - 1,
      img,
    });
  };

  const productStockLevelColor = {
    backgroundColor:
      (quantity === 0 && "tomato") ||
      (quantity <= 3 && "yellow") ||
      (quantity > 3 && "#05d305"),
  };

  return (
    <div className="product wrapper" id={id}>
      <p className="product__id" style={productStockLevelColor}>
        {id}
      </p>
      <ProductImage srcImage={img} id={id} />
      <ProductStockLevel
        quantity={quantity}
        isEditing={isEditing}
        handleToggleEdit={handleToggleEdit}
        handleSetNewQuantity={setQuantity}
        handleSaveInDB={handleSaveInDB}
      />
      <ProductActionsButtons
        quantity={quantity}
        handleSetQuantity={handleSetQuantity}
      />
    </div>
  );
};

export default Product;
