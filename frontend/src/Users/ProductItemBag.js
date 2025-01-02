import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ProductsCartContext,
  ProductsContext,
} from "../Product/ProductsContext";
import { useContext, useEffect, useState } from "react";
import numeral from "numeral";
import { Add, Remove, Delete } from "@mui/icons-material";
import FileDownloadDisplay from "../File/FileDownloadDisplay";

export default function ProductItemBag() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // const cart = useContext(ProductsCartContext);
  // const dispatch = useContext(ProductsCartContext);
  const { cart, dispatch } = useContext(ProductsCartContext);
  // console.log("ProductItemBag begin");
  // console.log("ProductItemBag cart:");
  // console.log(cart);

  const [products, setProducts] = useState([]);

  const [sumSubTotal, setSumSubTotal] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [sumTotal, setSumTotal] = useState(0);

  useEffect(() => {
    console.log("XXXXXXXXXXXXXXXXXXX:useEffect cart.items changed");

    setProducts((prevProducts) => initProductsFromCart(cart));
    // console.log("Products:", products);

    const sumSubTotal = calSumSubTotal(cart.items);
    const delivery = calDelivery(sumSubTotal);

    setSumSubTotal((prestate) => sumSubTotal);
    setDelivery((prestate) => delivery);
    setSumTotal((prestate) => calSumTotal(sumSubTotal, delivery));
  }, [cart.items]);

  function initProductsFromCart(cart) {
    //console.log("initProductsFromCart cart items:");
    if (cart.items.length == 0) {
      //console.log("cart.items EMPTY!");
      return [];
    }
    //console.log(cart.items);
    return cart.items.map((item) => {
      const subTotalValue = item.quantity * item.price;
      return { ...item, subTotal: subTotalValue };
    });
  }

  const handleAdd = (e, id) => {
    //console.log("add products");

    const newItems = cart.items.map((item) => {
      if (item.id == id) {
        const quantityVal = parseInt(item.quantity) + 1;
        return {
          ...item,
          quantity: quantityVal,
          subTotal: quantityVal * item.price,
        };
      } else {
        return item;
      }
    });

    //console.log("REPLACE_ITEM newItems", newItems);

    dispatch({ type: "REPLACE_ITEM", payload: newItems });
  };

  const handleChangeQuantity = (e, id) => {
    let quantityVal = parseInt(e.target.value);
    // console.log("quantityVal:", quantityVal);
    if (isNaN(quantityVal)) {
      quantityVal = 1; // Nếu giá trị không phải là số, đặt giá trị mặc định là 1
    }

    const newItems = cart.items.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          quantity: quantityVal,
          subTotal: quantityVal * item.price,
        };
      } else {
        return item;
      }
    });

    //console.log("REPLACE_ITEM newItems", newItems);
    dispatch({ type: "REPLACE_ITEM", payload: newItems });
  };

  function calSumSubTotal(products) {
    let total = 0;
    //console.log("calSumSubTotal products.length:", products.length);
    if (products.length > 0) {
      products.forEach((item) => {
        let quantity = parseInt(item.quantity);
        total = total + item.price * quantity;
      });
    }
    //console.log("calSumSubTotal ", total);
    return total;
  }

  function calDelivery(sumSubTotal) {
    return sumSubTotal >= 5000 ? 0 : sumSubTotal * 0.1;
  }

  function calSumTotal(sumSubTotal, delivery) {
    return sumSubTotal + delivery;
  }

  const handleSubTract = (e, id) => {
    //e.preventDefault();

    const newItems = cart.items.map((item) => {
      const quantityVal =
        parseInt(item.quantity) > 0 ? parseInt(item.quantity) - 1 : 0;
      if (item.id == id) {
        return {
          ...item,
          quantity: quantityVal,
          subTotal: quantityVal * item.price,
        };
      } else {
        return item;
      }
    });
    // console.log("REPLACE_ITEM newItems", newItems);
    dispatch({ type: "REPLACE_ITEM", payload: newItems });
  };
  const handleDelete = (e, item) => {
    //cart.removeToCart(id);
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  async function handleOrderProducts(e) {
    e.preventDefault();

    //cart.items
    try {
      const productOrders = cart.items.map((item) => ({
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
        productId: item.id,
      }));
      const orderRequest = {};

      const sumSubTotal = calSumSubTotal(cart.items);
      const delivery = calDelivery(sumSubTotal);

      orderRequest.items = productOrders;
      orderRequest.delivery = delivery;
      orderRequest.total = calSumTotal(sumSubTotal, delivery);

      //console.log("orderRequest: ", orderRequest);
      const result = await registerData(orderRequest);
      if (result.statusCode === 201) {
        //console.log("navigate to ProductAPP");
        alert("Order successfull");
        //clear carts
        //cart.reset();
        dispatch({ type: "RESET" });
        navigate("/Home");
      }
    } catch (error) {
      // Handle any errors (e.g., show an error message)
      console.error("Error during registration:", error);
    }
  }
  function registerData(orderRequest) {
    return new Promise((resovle, reject) => {
      try {
        fetch("/api/orders", {
          method: "POST", // HTTP method
          headers: {
            "Content-Type": "application/json", // Ensure the server understands the JSON format
          },
          body: JSON.stringify(orderRequest), // Convert the data to a JSON string
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
            //console.log("Register data success, API Response:", data);
            resovle(data);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        reject(error);
      }
    });
  }

  return (
    <div className="container_bag">
      {products.length == 0 && (
        <>
          <div className="title header"> YOUR SHOPPING CART. </div>
          <div className="action-row empty_message text_align_center">
            No item your cartogory.
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
      <div className="left-content">
        {products.length > 0 &&
          products.map((item, index) => (
            <>
              <div className="row-item" key={item.id}>
                <div className="column-item" key={index * 10 + index}>
                  {/* <img
                    className="img_cart"
                    src="https://kmartau.mo.cloudinary.net/d734b843-3ab6-4153-b343-2d8ca42292a0.jpg?tx=w_640,h_640"
                    alt="Downloaded file"
                    style={{ maxWidth: "100%" }}
                  /> */}

                  <FileDownloadDisplay
                    key={index * 10 + index}
                    docId={item.docId}
                    className="img_cart"
                    alt="Not download image"
                    style={{ maxWidth: "100%" }}
                  ></FileDownloadDisplay>
                </div>
                <div className="column-item">
                  <span className="item_name">{item.productName}</span>
                </div>
                <div className="column-item">
                  <span className="item_name">
                    {numeral(item.price).format("$0,0.00")}
                  </span>
                </div>
                <div className="column-item">
                  <span className="group_quantity">
                    <button
                      onClick={(e) => handleSubTract(e, item.id)}
                      className="button"
                    >
                      <Remove />
                    </button>
                    <input
                      type="text"
                      className="required item-small"
                      name="quantity"
                      value={item.quantity}
                      required
                      onChange={(e) => handleChangeQuantity(e, item.id)}
                    />
                    <button
                      onClick={(e) => handleAdd(e, item.id)}
                      className="button"
                    >
                      <Add />
                    </button>
                  </span>
                </div>
                <div className="column-item">
                  <span className="sub-total">
                    {numeral(item.subTotal).format("$0,0.00")}
                  </span>
                </div>
                <div className="column-item">
                  <span className="item_delete">
                    <button
                      onClick={(e) => handleDelete(e, item)}
                      className="button"
                    >
                      <Delete />
                    </button>
                  </span>
                </div>
              </div>
            </>
          ))}
      </div>
      <div className="right-content">
        {products.length > 0 && (
          <>
            <div className="title">Order summary</div>
            <hr></hr>
            <div className="sub-title">
              <span>
                Item subtotal: {numeral(sumSubTotal).format("$0,0.00")}{" "}
              </span>
            </div>
            <div className="sub-title">
              <span>Delivery : {numeral(delivery).format("$0,0.00")}</span>
            </div>
            <hr></hr>
            <div className="total">
              <span>
                Total (include GST): {numeral(sumTotal).format("$0,0.00")}{" "}
              </span>
            </div>
            <hr></hr>
            <div className="title">
              <button
                className="btn_register max-full-width"
                onClick={(e) => handleOrderProducts(e)}
              >
                Order Products
              </button>
            </div>

            <div className="continue-shopping">
              <Link to="/Home" className="item">
                Cotinue to shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
