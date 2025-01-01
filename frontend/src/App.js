import "./App.css";
import ProductAppContext from "./Product/ProductAppContext";
import ProductAddContext from "./Product/ProductAddContext";
import ProductListApp from "./Users/ProductListApp";

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductItemSelect from "./Users/ProductItemSelect";
import ProductItemBag from "./Users/ProductItemBag";
import { ProductsCartContext } from "./Product/ProductsContext";

import OrderComponent from "./Orders/OrderComponent";

function App() {
  const [countCart, setCountCart] = useState(0);
  // const [cart, setCart] = useState({ items: [] });

  const cart = {
    items: [],
    addToCart: (item) => {
      console.log("addToCart process item:", item);
      //check item id if not exits then push or exits update to increase quantity

      const foundItem = cart.items.filter((cartItem) => cartItem.id == item.id);
      if (foundItem && foundItem.length > 0) {
        // console.log("foundItem length: ", foundItem.length);
        cart.items.forEach((obj) => {
          if (obj.id == item.id) {
            obj.quantity = obj.quantity + item.quantity;
          }
        });
      } else {
        //console.log("not foundItem  ");
        cart.items.push(item);
      }
      // const totalQuantity = cart.items.reduce(
      //   (total, item) => total + item.quantity,
      //   0
      // );
      // console.log("totalQuantity:", totalQuantity);
      // setCountCart((prestate) => totalQuantity);
      console.log("items after:");
      console.log(cart.items);
    },
    removeToCart: (id) => {
      const result = cart.items.filter((cartItem) => cartItem.id != id);
      cart.items = result;
      //console.log("result after remove to carts: ");
      console.log(cart.items);
      const totalQuantity = cart.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCountCart(totalQuantity);
    },
    reset: () => {
      cart.items = [];
      setCountCart(0);
    },
  };

  // Example cart object
  useEffect(() => {
    console.log("cart items changes");
    console.log("cart.items.length:");
    console.log(cart.items.length);
  }, [cart]);

  function Home() {
    return <h1>Home Page</h1>;
  }

  function About() {
    return <h1>About Page</h1>;
  }

  return (
    <ProductsCartContext.Provider value={cart}>
      <div className="main-layout">
        <BrowserRouter>
          <div className="main-header">
            <div className="main-header-container-flex">
              <div className="left-group">
                <div className="logo item">Logo</div>
                <Link to="/about" className="item">
                  About
                </Link>
                <div className="home item">
                  <Link to="/Home" className="item">
                    Home
                  </Link>
                </div>
                <Link to="/ProductApp" className="item">
                  Product
                </Link>
                <Link to="/Order" className="item">
                  Tracking-Order
                </Link>
              </div>

              <div className="title">Shopping online C-Mart</div>
              <div className="right-group">
                <div className="item">
                  <Link to="/Users/ProductItemBag">
                    Cart
                    <span
                      style={{
                        // position: "absolute",
                        // top: "0",
                        //right: "-10px",
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "4px 8px",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    >
                      {countCart}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />

              <Route path="/ProductApp" element={<ProductAppContext />} />
              <Route path="/ProductAdd" element={<ProductAddContext />} />

              <Route path="/Home" element={<ProductListApp />} />
              <Route
                path="/Users/ProductItemSelect/:id"
                element={<ProductItemSelect />}
              />

              <Route
                path="/Users/ProductItemBag"
                element={<ProductItemBag />}
              />

              <Route path="/Order" element={<OrderComponent />} />
            </Routes>
          </div>
          <div className="main-footer">
            <div className="main-header-container-flex">
              <div className="left-group">
                <div className="profile-github">github</div>
              </div>
              <div className="title">COPY RIGHT 2024 - DUC CUONG BUI</div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </ProductsCartContext.Provider>
  );
}

export default App;
