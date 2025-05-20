import { useReducer, useEffect, useState } from "react";
import ProductListContext from "./ProductListContext.js";
import { ProductsContext, ProductsDispatchContext } from "./ProductsContext.js";
import { useNavigate, useLocation } from "react-router-dom";
import BASE_URL from "../config";
//const initialTasks = { products: [] };

export default function ProductAppContext() {
  //const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [products, dispatch] = useReducer(tasksReducer, []);
  const [loading, setLoading] = useState(true);

  const productFromState = location.state;

  // Fetch dữ liệu từ API NestJS
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          const response = await fetch(`${BASE_URL}/api/product/findall`); // URL của API
          const result = await response.json();

          setLoading(false);
          const result2 = result.data.map((t) => ({ ...t, done: true }));
          dispatch({ type: "replace", payload: result2 }); // Dùng dispatch để cập nhật reducer
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Chỉ chạy khi component được mount

  function tasksReducer(state, action) {
    switch (action.type) {
      case "changed": {
        const updateList = state.map((t) => {
          //console.log(action.task);
          if (t.id === action.task.id) {
            return action.task;
          } else {
            return t;
          }
        });
        // console.log("updatelist changed updateList");
        // console.log(updateList);
        return updateList;
      }

      case "deleted": {
        return state.filter((t) => t.id !== action.id);
      }
      case "replace": {
        const updateList = action.payload;

        return updateList;
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  return (
    <ProductsContext.Provider value={products}>
      <ProductsDispatchContext.Provider value={dispatch}>
        <>
          <h1>PRODUCT MANAGEMENT</h1>
          <div className="contain_input">
            <button
              className="btn register"
              onClick={() => {
                navigate("/ProductAdd", {
                  state: {
                    state: products,
                  }, // Pass dispatch for state updates
                });
              }}
            >
              {" "}
              Register Product
            </button>
            <ProductListContext></ProductListContext>
          </div>
        </>
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
}
