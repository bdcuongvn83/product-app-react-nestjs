import { useEffect, useState } from "react";
import ProductList from "./ProductList.js";
import { ProductsContext } from "../Product/ProductsContext.js";
import { useNavigate, useLocation } from "react-router-dom";

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

  // Fetch dữ liệu từ API NestJS
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          const response = await fetch("/api/product/findall"); // URL của API
          const result = await response.json();

          //setProducts(result.data);
          setLoading(false);
          const result2 = result.data.map((t) => ({ ...t, done: true }));
          setProducts((prestate) => result2);
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
        <input
          type="text"
          className="required"
          name="productName"
          value={productName}
          required
          onChange={handleChange}
        />

        <div className="contain_input">
          <button
            className="button register"
            onClick={() => {
              alert("search");
            }}
          >
            {" "}
          </button>
          <ProductList></ProductList>
        </div>
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
