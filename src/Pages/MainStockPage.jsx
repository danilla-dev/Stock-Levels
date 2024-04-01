import React, { useEffect, useState, useContext } from "react";
// Components
import Product from "../components/Product";
// Styles
import "../assets/styles/MainStockPage.scss";
// Contexts
import { NewProductFormPopupContext } from "../contexts/NewProductFormPopupContext";

// Lib
import { child, get } from "firebase/database";
// DB
import { dbRef } from "../database/firebaseConfig";
// Icons
import { FaPlusSquare } from "react-icons/fa";

const ShowAddNewProductFormButton = () => {
  const { toggleShowPopup } = useContext(NewProductFormPopupContext);
  return (
    <div className="show-add-new-product-form">
      <p className="show-add-new-product-form__text">Add new product!</p>
      <button
        onClick={toggleShowPopup}
        className="show-add-new-product-form__button"
      >
        <FaPlusSquare />
      </button>
    </div>
  );
};

const MainStockPage = () => {
  const [products, setProducts] = useState([]);

  get(child(dbRef, `products`)).then((snapshot) => {
    if (snapshot.exists()) {
      const dataArray = Object.values(snapshot.val());
      setProducts(dataArray);
    } else {
      console.log("No data available");
    }
  });

  return (
    <div className="main-stock-page">
      {products.map((product, index) => {
        return (
          <Product
            id={product.id}
            stockLevel={parseInt(product.stockLevel)}
            img={product.img}
            key={index}
          />
        );
      })}
      <ShowAddNewProductFormButton />
    </div>
  );
};

export default MainStockPage;
