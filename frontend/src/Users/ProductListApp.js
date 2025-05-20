import { useEffect, useState } from "react";
import ProductList from "./ProductList.js";
import { ProductsContext } from "../Product/ProductsContext.js";
import { useNavigate, useLocation } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import BASE_URL from "../config";
//const initialTasks = { products: [] };

//ProductsCartContext

export default function ProductListApp() {
  const [productName, setProductName] = useState();
  //const [products, setProducts] = useState(initialTasks);//TODO dummy test
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  //Event for field change
  function handleChange(e) {
    setProductName((prevState) => e.target.value);
  }

  async function searchProduct(e) {
    e.preventDefault();
    try {
      const params = {
        productName: productName,
        // param2: 'value2',
      };
      setLoading(true);
      const queryString = new URLSearchParams(params).toString();
      const url = `${BASE_URL}/api/product/searchList?${queryString}`;

      const response = await fetch(url); // URL của API

      const result = await response.json();

      setLoading(false);
      const result2 = result.data.map((t) => ({ ...t, done: true }));
      setProducts((prestate) => result2);

      //dispatch({ type: "replace", payload: result2 }); // Dùng dispatch để cập nhật reducer
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Fetch dữ liệu từ API NestJS
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          const response = await fetch("/api/product/findall"); // URL của API
          const result = await response.json();

          //setProducts(result.data);
          const result2 = result.data.map((t) => ({ ...t, done: true }));
          setProducts((prestate) => result2);
          setLoading(false);
          //dispatch({ type: "replace", payload: result2 }); // Dùng dispatch để cập nhật reducer
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Chỉ chạy khi component được mount

  return (
    <ProductsContext.Provider value={products}>
      <>
        <h1>PRODUCT SHOP</h1>
        <div className="container-search">
          <input
            type="text"
            className="input-search"
            name="productName"
            value={productName}
            onChange={handleChange}
            placeholder="Search at supermarket"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                searchProduct(e);
              }
            }}
          />

          <button
            className="btn register"
            onClick={(e) => searchProduct(e)}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner"></span> // Loading spinner icon
            ) : (
              <SearchIcon />
            )}
          </button>
        </div>
        <div className="margin-top">{!loading && <ProductList />}</div>
      </>
    </ProductsContext.Provider>
  );
}

// let nextId = 3;
// const initialTasks = [
//   { id: 0, productName: "Visit Kafka Museum1", price: 1000, done: true },
//   { id: 1, productName: "Visit Kafka Museum2", price: 2000, done: true },
//   { id: 2, productName: "Visit Kafka Museum3", price: 3000, done: false },
//   { id: 3, productName: "Visit Kafka Museum4", price: 3000, done: false },
//   { id: 4, productName: "Visit Kafka Museum5", price: 3000, done: false },
//   { id: 5, productName: "Visit Kafka Museum4", price: 3000, done: false },
//   { id: 6, productName: "Visit Kafka Museum5", price: 3000, done: false },
//   { id: 7, productName: "Visit Kafka Museum4", price: 3000, done: false },
//   { id: 8, productName: "Visit Kafka Museum5", price: 3000, done: false },
// ];
