import { useContext } from "react";

import { Link } from "react-router-dom";

import {
  ProductsDispatchContext,
  ProductsContext,
} from "../Product/ProductsContext";
import numeral from "numeral";
import FileDownloadDisplay from "../File/FileDownloadDisplay";

export default function ProductList() {
  const products = useContext(ProductsContext);
  //console.log("ProductList products");
  //console.log(products);

  if (products == null) {
    throw new Error("TaskAddContext must be used within a TaskAppContext");
  }

  return (
    <>
      <div className="product-list">
        {products.map((item, index) => (
          <>
            <div className="product-item" key={item.id}>
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

              <div className="item_label">
                <Link to={`/Users/ProductItemSelect/${item.id}`} state={item}>
                  {item.productName}
                </Link>
              </div>
              <div className="item_price">
                <span>{numeral(item.price).format("$0,0.00")}</span>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
