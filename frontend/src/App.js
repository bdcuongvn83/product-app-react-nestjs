import "./App.css";
import ProductAppContext from "./Product/ProductAppContext";
import ProductAddContext from "./Product/ProductAddContext";
import ProductListApp from "./Users/ProductListApp";

import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductItemSelect from "./Users/ProductItemSelect";
import ProductItemBag from "./Users/ProductItemBag";
import { ProductsCartContext } from "./Product/ProductsContext";

import OrderComponent from "./Orders/OrderComponent";
import Chatbot from "./Chatbot/Chatbot";

function App() {
  const [countCart, setCountCart] = useState(0);
  //const [cart, setCart] = useState({ items: [] });
  const [cart, dispatch] = useReducer(tasksReducer, {
    items: [],
  });

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch({ type: "REPLACE_ITEM", payload: storedCart });
  }, []); // Chạy một lần khi trang được tải lại

  // Save cart to localStorage khi có sự thay đổi
  useEffect(() => {
    if (cart.items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart.items));
    }
  }, [cart.items]); // Chạy mỗi khi cart.items thay đổi

  function tasksReducer(state, action) {
    console.log("action", action);
    switch (action.type) {
      case "ADD_ITEM":
        //case Add new/case add multi time on the same item.
        console.log("tasksReducer ADD_ITEM");

        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          //exist, increse quantity
          const newitems = state.items.map((item) => {
            if (item.id == action.payload.id) {
              return {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              };
            } else {
              return item;
            }
          });

          return {
            ...state,
            items: newitems,
          };
        } else {
          //not exist, add
          return {
            ...state,
            items: [...state.items, action.payload],
          };
        }

      case "REPLACE_ITEM":
        //case Add quantity/Remove quantity/change Quantity

        console.log("tasksReducer REPLACE_ITEM");

        return {
          ...state,
          items: action.payload,
        };

      case "REMOVE_ITEM":
        console.log("tasksReducer REMOVE_ITEM");
        const newitems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        if (newitems.length == 0) {
          //reset localstorage
          localStorage.setItem("cart", JSON.stringify(newitems));
        }
        return {
          ...state,
          items: newitems,
        };
      case "RESET":
        console.log("tasksReducer RESET");
        return {
          ...state,
          items: [],
        };
      default:
        console.log("tasksReducer default");
        return state;
    }
  }

  // Example cart object
  useEffect(() => {
    //console.log("XXXXXXXXXXX useEffect calculate CountCarts");

    setCountCart((prestate) => cart.items.length);
    console.log(cart.items.length);
  }, [cart.items]);

  function Home() {
    return <h1>Home Page</h1>;
  }

  function About() {
    return <h1>About Page</h1>;
  }

  return (
    <ProductsCartContext.Provider value={{ cart, dispatch }}>
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
                    {countCart > 0 ? (
                      <span
                        style={{
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
                    ) : (
                      ""
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<ProductListApp />} />
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
                <div className="profile-github">
                  <a href="https://github.com/bdcuongvn83/product-app-react-nestjs">
                    Github
                  </a>
                </div>
              </div>
              <div>
                <div className="title">COPY RIGHT 2024 - DUC CUONG BUI</div>
                <Chatbot />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </ProductsCartContext.Provider>
  );
}

export default App;
