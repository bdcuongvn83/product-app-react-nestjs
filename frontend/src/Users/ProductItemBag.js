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
  //const products = useContext(ProductsContext);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useContext(ProductsCartContext);

  //const { products } = location || location.state || {}; // Truyền dữ liệu qua state
  //const product = state || {}; // Lấy dữ liệu sản phẩm từ state

  console.log(`ProductItemBag cart `);
  console.log(cart);

  //const initialProducts = cart.items || [];
  const [products, setProducts] = useState(
    //initialProducts.map((item) => {
    initProductsFromCart(cart)
  );
  const [sumSubTotal, setSumSubTotal] = useState(calSumSubTotal());

  const [delivery, setDelivery] = useState(calDelivery());
  const [sumTotal, setSumTotal] = useState(calSumTotal());

  useEffect(() => {
    const sumSubTotal = calSumSubTotal();
    const delivery = calDelivery(sumSubTotal);

    setSumSubTotal(sumSubTotal);
    setDelivery(delivery);
    setSumTotal(calSumTotal(sumSubTotal, delivery));
  }, [products]);

  function initProductsFromCart(cart) {
    console.log("initProductsFromCart cart items:");
    console.log(cart.items);
    return cart.items.map((item) => {
      const subTotalValue = item.quantity * item.price;
      return { ...item, subTotal: subTotalValue };
    });
  }
  const handleAdd = (e, id) => {
    console.log("add products");

    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id !== id
          ? item
          : {
              ...item,
              quantity: parseInt(item.quantity) + 1,
              subTotal: (parseInt(item.quantity) + 1) * item.price,
            }
      )
    );

    console.log(products);
  };

  const handleChangeQuantity = (e, id) => {
    let quantityVal = parseInt(e.target.value);
    // console.log("quantityVal:", quantityVal);
    if (isNaN(quantityVal)) {
      quantityVal = 1; // Nếu giá trị không phải là số, đặt giá trị mặc định là 1
    }
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id !== id ? item : { ...item, quantity: e.target.value }
      )
    );
  };

  function calSumSubTotal() {
    let total = 0;
    console.log("calSumSubTotal products.length:", products.length);
    if (products.length > 0) {
      products.forEach((item) => {
        console.log("item:");
        console.log(item);
        let quantity = parseInt(item.quantity);
        total = total + item.price * quantity;
      });
    }
    console.log("calSumSubTotal ", total);
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

    setProducts(
      products.map((item) =>
        item.id !== id
          ? item
          : {
              ...item,
              quantity:
                parseInt(item.quantity) > 0 ? parseInt(item.quantity) - 1 : 0,
              subTotal: (parseInt(item.quantity) - 1) * item.price,
            }
      )
    );
  };
  const handleDelete = (e, id) => {
    alert("Delete item");
    cart.removeToCart(id);
    setProducts((prevProducts) => initProductsFromCart(cart));
    console.log("after delete cart");
    console.log(cart.items);
    // setProducts((prevProducts) =>
    //   prevProducts.filter((item) => item.id !== id)
    // );
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

      const sumSubTotal = calSumSubTotal();
      const delivery = calDelivery(sumSubTotal);

      orderRequest.items = productOrders;
      orderRequest.delivery = delivery;
      orderRequest.total = calSumTotal(sumSubTotal, delivery);

      console.log("orderRequest: ", orderRequest);
      const result = await registerData(orderRequest);
      if (result.statusCode === 201) {
        //console.log("navigate to ProductAPP");
        alert("order successfull");
        //clear carts
        cart.reset();
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
              <div className="row-item" key={index}>
                <div className="column-item">
                  {/* <img
                    className="img_cart"
                    src="https://kmartau.mo.cloudinary.net/d734b843-3ab6-4153-b343-2d8ca42292a0.jpg?tx=w_640,h_640"
                    alt="Downloaded file"
                    style={{ maxWidth: "100%" }}
                  /> */}

                  <FileDownloadDisplay
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
                      onClick={(e) => handleDelete(e, item.id)}
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
