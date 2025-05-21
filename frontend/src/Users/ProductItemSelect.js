import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ProductsCartContext,
  ProductsContext,
} from "../Product/ProductsContext";
import { useContext, useState, useEffect } from "react";
import numeral from "numeral";
import Modal from "react-modal";
import ReactModal from "react-modal";
import FileDownloadDisplay from "../File/FileDownloadDisplay";
import { CircularProgress } from "@mui/material";
import BASE_URL from "../config";

export default function ProductItemSelect() {
  const navigate = useNavigate();

  const { cart, dispatch } = useContext(ProductsCartContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { id } = useParams();
  const location = useLocation();

  const { state } = location || location.state || {}; // Truyền dữ liệu qua state
  //let product = state || {}; // Lấy dữ liệu sản phẩm từ state
  const [loading, setLoading] = useState(true); // Add loading state

  const [product, setProduct] = useState(state || {});

  useEffect(() => {
    // console.log("useEffect:");
    const fetchProduct = async () => {
      // console.log("fetchProduct:id", id);
      //search for id

      const result = await findProductById(id);
      // console.log("result:", result);
      setProduct(result);
      // console.log("findProduct:", product);
      setLoading(false);
    };

    // console.log("product:", product);
    if (isEmptyProduct(product)) {
      fetchProduct();
    } else {
      console.log("not search data, using from list");
      setLoading(false);
    }
  }, [id]); // Chỉ chạy khi

  if (loading) {
    return (
      //return <h1>Loading...</h1>; // Show loading state
      <div className="spinner-container">
        <CircularProgress />
      </div>
    );
  }

  if (isEmptyProduct(product)) {
    return <h1>No product selected</h1>;
  }
  function isEmptyProduct(product) {
    return Object.keys(product).length === 0;
  }

  async function findProductById(id) {
    //e.preventDefault();
    try {
      //const queryString = new URLSearchParams(params).toString();
      const url = `${BASE_URL}/api/product/find/${parseInt(id)}`;

      const response = await fetch(url); // URL của API

      const result = await response.json();
      console.error("result fetching data:", result);

      const result2 = result;
      return { ...result2, done: true };

      //dispatch({ type: "replace", payload: result2 }); // Dùng dispatch để cập nhật reducer
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  //console.log(`Product ID: ${id}`);

  return (
    <div className="container_select_product">
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)} // Close modal when pressing Esc
        shouldCloseOnOverlayClick={false} // Disable closing on overlay click
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            color: "black",
            margin: "auto",
            width: "400px",
            height: "300px",
            textAlign: "center",
          },
        }}
      >
        <div className="container_popup">
          {/* Add an "X" button for closing the modal */}
          <button
            onClick={() => setModalIsOpen(false)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
          <div className="title header">
            <h2>Added to your bag </h2>
          </div>

          <div className="left-content">
            {/* <img
              className="img_cart"
              src="https://kmartau.mo.cloudinary.net/d734b843-3ab6-4153-b343-2d8ca42292a0.jpg?tx=w_640,h_640"
              alt="Downloaded file"
              style={{ maxWidth: "100%" }}
            /> */}
            <FileDownloadDisplay
              docId={product.docId}
              className="img_cart"
              alt="Not download image"
              style={{ maxWidth: "100%" }}
            ></FileDownloadDisplay>
          </div>
          <div className="right-content">
            <div className="item_name">
              <span>{product.productName}</span>
            </div>
            <div className="item_price">
              <span>{numeral(product.price).format("$0,0.00")}</span>
            </div>
            <div className="item_quantity">
              <span>{product.quantity}</span>
            </div>
          </div>
          <div className="view-to-bag">
            <Link to="/Users/ProductItemBag"> View your Bag </Link>
          </div>
        </div>
      </ReactModal>

      <div className="left-content">
        {/* <img
          className="img_cart"
          src="https://kmartau.mo.cloudinary.net/d734b843-3ab6-4153-b343-2d8ca42292a0.jpg?tx=w_640,h_640"
          alt="Downloaded file"
          style={{ maxWidth: "100%" }}
        /> */}

        <FileDownloadDisplay
          docId={product.docId}
          className="img_cart"
          alt="Not download image"
          style={{ maxWidth: "100%" }}
        ></FileDownloadDisplay>
      </div>
      <div className="content">
        <div className="item_name">
          <span>{product.productName}</span>
        </div>
        <div className="item_price">
          <span>{numeral(product.price).format("$0,0.00")}</span>
        </div>
        <div className="item_add">
          <span>
            <button
              className="btn_add_to_bag text_align_left"
              onClick={() => {
                const newItem = {
                  id: product.id,
                  productName: product.productName,
                  price: product.price,
                  quantity: 1,
                  docId: product.docId,
                }; // Example item
                // console.log("onclick cart item:");
                // console.log(newItem);
                dispatch({ type: "ADD_ITEM", payload: newItem });

                setModalIsOpen(true);
              }}
            >
              Add To Bag List
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
