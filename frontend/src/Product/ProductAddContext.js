import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProductAddContext() {
  //form data contain all of input items on screen.
  const [formData, setFormData] = useState({
    productName: "",
    price: 0,
  });

  //contain error messsages relating all input items on screen.
  const [formErrors, setFormErrors] = useState({
    productName: "",
    price: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  //Event for field change
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
    //clear errors
    setFormErrors((prevState) => ({ productName: "", price: "" }));
    //check validation
    if (name === "productName" && value.length <= 0) {
      setFormErrors((...prevState) => ({
        ...prevState,
        productName: "Product name is required",
      }));
    }
    if (name === "price" && value.length <= 0) {
      setFormErrors((...prevState) => ({
        ...prevState,
        price: "Price is required",
      }));
    }
  }

  function onCancel(e) {
    e.preventDefault();
    navigate("/ProductApp");
  }

  async function handleSubmitForm(e) {
    e.preventDefault();

    // Final validation check
    const isFormValid = Object.values(formErrors).every(
      (error) => error === ""
    );
    try {
      if (isFormValid) {
        setFormData({ productName: "", price: 0 });
        setFormErrors({ productName: "", price: "" });

        // const productsNew = {
        //   productName: formData.productName,
        //   price: formData.price,
        // };
        // Tạo FormData để gửi dữ liệu và file
        const formDataToSend = new FormData();
        formDataToSend.append("productName", formData.productName);
        formDataToSend.append("price", formData.price);
        if (selectedFile) {
          formDataToSend.append("file", selectedFile);
        }

        const result = await registerData(formDataToSend);
        if (result.statusCode === 201) {
          //console.log("navigate to ProductAPP");
          navigate("/ProductApp");
        }
      } else {
        console.log("There is errors on items on screen");
      }
    } catch (error) {
      // Handle any errors (e.g., show an error message)
      console.error("Error during registration:", error);
    }
  }

  function registerData(formData) {
    console.log("formData:");
    console.log(formData);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    return new Promise((resovle, reject) => {
      try {
        fetch("/api/product", {
          method: "POST", // HTTP method
          // headers: {
          //   "Content-Type": "multipart/form-data", // Ensure the server understands the JSON format
          // },
          // body: JSON.stringify(formData), // Convert the data to a JSON string
          body: formData,
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
    <>
      <form name="myForm" onSubmit={handleSubmitForm}>
        <div className="form-container">
          <h1 className="form-title">PRODUCT REGISTER </h1>
          <div className="form-panel">
            <div className="form-row">
              <div className="form-item">
                <label>Product Name: </label>
              </div>
              <div className="form-item">
                <input
                  type="text"
                  className="required"
                  name="productName"
                  value={formData.productName}
                  required
                  onChange={handleChange}
                />

                {formErrors.productName && (
                  <p className="form-item-error">{formErrors.productName}</p>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <label>Product Price: </label>
              </div>
              <div className="form-item">
                <input
                  type="number"
                  className="required"
                  required
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
                {formErrors.price && (
                  <p className="form-item-error">{formErrors.price}</p>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <label>Product Name: </label>
              </div>
              <div className="form-item">
                <input
                  type="file"
                  className="required"
                  value={formData.fileName}
                  name="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  id="fileInput"
                  required
                />
              </div>
            </div>
            <div className="form-row button-row">
              <div>
                <button className="btn" type="submit">
                  Register
                </button>
                <button className="btn" type="button" onClick={onCancel}>
                  {" "}
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}