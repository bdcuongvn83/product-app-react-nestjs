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

  // if (products == null) {
  //   throw new Error("TaskAddContext must be used within a TaskAppContext");
  // }

  return (
    <>
      {(!products || products.length === 0) && (
        <p className="form-item-error padding-left">No products found.</p>
      )}

      <div className="product-list">
        {products.map((item, index) => (
          <>
            <div className="product-item" key={"rowkeyIndex_" & item.id}>
              <FileDownloadDisplay
                docId={item.docId}
                className="img_cart"
                alt="Not download image"
                style={{ maxWidth: "100%" }}
                key={item.docId} // Key thay đổi sẽ ép React re-render
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
