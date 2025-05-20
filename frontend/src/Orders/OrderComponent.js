import { useReducer, useEffect, useState } from "react";
import ProductListContext from "./OrderListComponent.js";
import OrdersContext, {
  ProductsContext,
  ProductsDispatchContext,
} from "./OrdersContext.js";
import { useNavigate, useLocation } from "react-router-dom";
import OrderListComponent from "./OrderListComponent.js";
import BASE_URL from "../config";
//const initialTasks = { products: [] };

export default function OrderComponent() {
  const location = useLocation();

  const [orders, dispatch] = useReducer(tasksReducer, []);
  const [loading, setLoading] = useState(true);
  const userId = 1; //TODO default userId : 1
  const productFromState = location.state;

  // Fetch dữ liệu từ API NestJS
  useEffect(() => {
    const params = {
      userId: userId,
    };

    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}/api/orders/searchOrderList?${queryString}`;
    console.log("url:", url);
    const fetchData = async () => {
      try {
        if (loading) {
          const response = await fetch(url); // URL của API
          const result = await response.json();

          setLoading(false);
          //const result2 = result.data.map((t) => ({ ...t, done: true }));
          dispatch({ type: "replace", payload: result.data }); // Dùng dispatch để cập nhật reducer
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Chỉ chạy khi component được mount

  function tasksReducer(state, action) {
    switch (action.type) {
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
    <OrdersContext.Provider value={orders}>
      <>
        <h1>Your tracking Order</h1>

        <OrderListComponent></OrderListComponent>
      </>
    </OrdersContext.Provider>
  );
}
