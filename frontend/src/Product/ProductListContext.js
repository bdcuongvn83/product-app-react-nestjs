import { useContext } from "react";
import { ProductsDispatchContext, ProductsContext } from "./ProductsContext";
import numeral from "numeral";

export default function ProductListContext() {
  const dispatch = useContext(ProductsDispatchContext);
  const products = useContext(ProductsContext);
  //console.log("productName");
  //console.log(products);

  if (products == null) {
    throw new Error("TaskAddContext must be used within a TaskAppContext");
  }

  async function handleSave(isSaveFlg, item) {
    //update xuong Database
    if (isSaveFlg) {
      // Dùng dispatch để cập nhật reducer
      //setLoading(false);
      updateData(item);
    } else {
      //input text change value, not update data, only update useState
      dispatch({
        type: "changed",
        task: { ...item, done: !item.done },
      });
    }
  }

  function updateData(product) {
    try {
      fetch("/api/product", {
        method: "PUT", // HTTP method
        headers: {
          "Content-Type": "application/json", // Ensure the server understands the JSON format
        },
        body: JSON.stringify(product), // Convert the data to a JSON string
        //body: JSON.stringify(action.task), // Convert the data to a JSON string
      })
        .then((response) => {
          // Check if the response is successful
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the JSON data from the response
        })
        .then((data) => {
          // Handle the data here
          //console.log("API Response:", data);
          if (data.updateResult > 0) {
            dispatch({
              type: "changed",
              task: { ...product, done: !product.done },
            });
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleDelete(id) {
    //update xuong Database
    // console.log("delete begin");
    // Dùng dispatch để cập nhật reducer
    //setLoading(false);

    try {
      fetch(`/api/product/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          // Check if the response is successful
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the JSON data from the response
        })
        .then((result) => {
          // Handle the data here
          //console.log("API Response:", result);
          if (result.updateResult > 0) {
            // console.log("deleted success");
            dispatch({
              type: "deleted",
              id: id,
            });
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
      <div className="content_list">
        <table border="1" className="listTable">
          <thead>
            <tr>
              <th style={{ width: "20px" }}>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th style={{ width: "120px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td style={{ width: "20px" }}>
                  <input type="checkbox"></input>
                </td>
                <td>
                  {item.done ? (
                    <div className="list_item item_left">
                      {item.productName}
                    </div>
                  ) : (
                    <input
                      className="input-fit-column required"
                      id={`task_` + item.id}
                      type="text"
                      value={item.productName}
                      onChange={(e) => {
                        const updatedTask = {
                          ...item,
                          productName: e.target.value,
                        }; // Chỉ thay đổi task hiện tại

                        dispatch({
                          type: "changed",
                          task: { ...item, productName: e.target.value },
                        });
                      }}
                    />
                  )}
                </td>
                <td>
                  {item.done ? (
                    <div className="list_item item_right">
                      {numeral(item.price).format("$0,0.00")}
                    </div>
                  ) : (
                    <input
                      className="input-fit-column required"
                      id={`task_` + item.id}
                      type="number"
                      value={item.price}
                      onChange={(e) => {
                        const updatedTask = { ...item, price: e.target.value }; // Chỉ thay đổi task hiện tại

                        dispatch({
                          type: "changed",
                          task: { ...item, price: e.target.value },
                        });
                      }}
                    />
                  )}
                </td>

                <td>
                  <button
                    onClick={() => {
                      handleSave(!item.done, item);
                    }}
                  >
                    {" "}
                    {item.done ? "Edit" : "Save"}
                  </button>
                  &nbsp;{" "}
                  <button onClick={() => handleDelete(item.id)}>
                    {" "}
                    Delete{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
