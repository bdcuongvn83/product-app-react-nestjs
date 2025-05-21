import { useContext, useEffect, useState } from "react";
import OrdersContext, {
  ProductsDispatchContext,
  ProductsContext,
} from "./OrdersContext";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import FileDownloadDisplay from "../File/FileDownloadDisplay";
import BASE_URL from "../config";

export default function OrderListComponent() {
  const orders = useContext(OrdersContext) || [];
  //console.log("productName");
  //console.log(products);
  const [items, setItems] = useState([]);

  const [selectedOrderId, setSelectedOrderId] = useState(0);

  //

  // Fetch dữ liệu từ API NestJS

  useEffect(() => {
    // console.log("useEffect hook SelectedOrderId change");
    if (selectedOrderId != 0) {
      const params = {
        orderId: selectedOrderId,
      };

      const queryString = new URLSearchParams(params).toString();
      const url = `${BASE_URL}/api/orders/searchOrderItemList?${queryString}`;
      // console.log("url:", url);
      const fetchData = async () => {
        try {
          //if (loading) {
          // console.log("useEffect hook fetch data change");
          const response = await fetch(url); // URL của API
          const result = await response.json();

          // setLoading(false);
          //const result2 = result.data.map((t) => ({ ...t, done: true }));
          //dispatch({ type: "replace", payload: result.data }); // Dùng dispatch để cập nhật reducer
          // console.log("searchOrderItemList:");
          //console.log(result.data);

          setItems((prestate) =>
            result.data.map((item) => ({
              ...item,
              subTotal: parseInt(item.quantity) * item.price,
            }))
          );
          // console.log("after search items:");
          // console.log(items);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      //reset
      setItems([]);
    }
  }, [selectedOrderId]); // Chỉ chạy khi component được mount

  const navigate = useNavigate();

  function getStatusValue(status) {
    let result = "";
    switch (status) {
      case 0:
        result = "Pending";
        break;
      case 1:
        result = "Inprogess";
        break;
      case 2:
        result = "Done";
        break;
      default:
        result = "None";
    }
    // console.log("getStatus value:", result);
    return result;
  }

  function formatDateTime(date) {
    return format(date, "yyyy/MM/dd HH:mm");
  }
  function showOrderItems(item, e) {
    // console.log("showOrderItems item:", item);
    // console.log(item);
    e.preventDefault(); //ngan reload trang voi URL /#/ khong dung.
    setSelectedOrderId((preState) => item.id);

    // console.log("showOrderItems item.id:", item.id);
    // console.log("showOrderItems SelectedOrderId:", selectedOrderId);
  }

  return (
    <>
      <div className="content_list">
        <div className="list-table">
          <div className="list-row">
            <div style={{ width: "20px" }} className="list-header">
              #
            </div>
            <div style={{ width: "15%" }} className="list-header">
              OrderId
            </div>
            <div style={{ width: "15%" }} className="list-header">
              Order Date
            </div>
            <div style={{ width: "10%" }} className="list-header flex-grow">
              Status
            </div>
            <div style={{ width: "15%" }} className="list-header">
              Delivery
            </div>
            <div style={{ width: "15%" }} className="list-header">
              Total
            </div>
          </div>
          {orders.map((item, index) => (
            <>
              <div className="list-row" key={index}>
                <div
                  style={{ width: "20px" }}
                  className={
                    item.id == selectedOrderId
                      ? "selected-list-item"
                      : "list-item"
                  }
                >
                  <span>{index + 1}</span>
                </div>

                <div
                  style={{ width: "15%" }}
                  className={
                    item.id == selectedOrderId
                      ? "selected-list-item"
                      : "list-item"
                  }
                >
                  <span>
                    <a href="#" onClick={(e) => showOrderItems(item, e)}>
                      {item.id}
                    </a>
                  </span>
                </div>
                <div
                  style={{ width: "15%" }}
                  className={
                    item.id == selectedOrderId
                      ? "selected-list-item"
                      : "list-item"
                  }
                >
                  <span>{formatDateTime(item.orderdate)}</span>
                </div>
                <div
                  style={{ width: "10%" }}
                  className={
                    item.id == selectedOrderId
                      ? "selected-list-item flex-grow"
                      : "list-item flex-grow"
                  }
                >
                  <span>{getStatusValue(item.status)}</span>
                </div>
                <div
                  style={{ width: "15%" }}
                  className={
                    item.id == selectedOrderId
                      ? "selected-list-item"
                      : "list-item"
                  }
                >
                  <span>{numeral(item.totalDelivery).format("$0,0.00")}</span>
                </div>

                <div
                  style={{ width: "15%" }}
                  className={
                    item.id == selectedOrderId
                      ? "selected-list-item"
                      : "list-item"
                  }
                >
                  <span className="total">
                    {numeral(item.total).format("$0,0.00")}
                  </span>
                </div>
              </div>
              {item.id == selectedOrderId ? (
                <div className="list-table">
                  <div className="list-child-row">
                    <div style={{ width: "20px" }} className="list-sub-header">
                      #
                    </div>
                    <div style={{ width: "100px" }} className="list-sub-header">
                      <span className="item_name ">Picture</span>
                    </div>

                    <div style={{ width: "30%" }} className="list-sub-header">
                      <span className="item_name flex-grow">Product Name</span>
                    </div>
                    <div style={{ width: "10%" }} className="list-sub-header">
                      <span className="item_name">Price</span>
                    </div>
                    <div style={{ width: "10%" }} className="list-sub-header">
                      <span className="item_name">Quantity</span>
                    </div>
                    <div
                      style={{ width: "10%" }}
                      className="list-sub-header flex-grow"
                    >
                      <span>SubTotal</span>
                    </div>
                  </div>
                  {items.map((childItem, indexItem) => (
                    <>
                      <div className="list-child-row" key={`sub_${indexItem}`}>
                        <div style={{ width: "20px" }} className="list-item">
                          {indexItem + 1}
                        </div>
                        <div style={{ width: "100px" }} className="list-item">
                          <span className="item_name ">
                            <FileDownloadDisplay
                              docId={childItem.product.docId}
                              className="img_cart"
                              alt="Not download image"
                              style={{ maxWidth: "100%" }}
                            ></FileDownloadDisplay>
                          </span>
                        </div>
                        <div style={{ width: "30%" }} className="list-item">
                          <span className="item_name">
                            {childItem.product?.productName}
                          </span>
                        </div>
                        <div style={{ width: "10%" }} className="list-item">
                          <span className="item_name">
                            {numeral(childItem.price).format("$0,0.00")}
                          </span>
                        </div>
                        <div style={{ width: "10%" }} className="list-item">
                          <span className="item_name">
                            {childItem.quantity}
                          </span>
                        </div>
                        <div
                          style={{ width: "10%" }}
                          className="list-item flex-grow"
                        >
                          <span className="sub-total">
                            {numeral(childItem.subTotal).format("$0,0.00")}
                          </span>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </>
          ))}
        </div>
      </div>

      {orders.length == 0 && (
        <>
          <div className="action-row empty_message text_align_center">
            No item your tracking order.
          </div>

          <div className="action-row text_align_center">
            <button
              className="button_shopping"
              onClick={() => navigate("/Home")}
            >
              Continute shopping
            </button>
          </div>
        </>
      )}
    </>
  );
}
