/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const UpdateProductPopup = (props) => {
  const [productImage, setProductImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    product_id: "",
    product_name: "",
    category: "",
    tags: "",
    description: "",
  });

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/product/product-details/${
          props.productId
        }`,
      );

      const fetchedProductDetails = response.data;
      fetchedProductDetails.tags = fetchedProductDetails.tags.join(", ");

      setProductDetails(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error.message);
    }
  };

  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  // handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductDetails({ ...productDetails, product_image: file });

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProductImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    // Clear the file input field
    const fileInput = document.getElementById("product_image");
    fileInput.value = null;

    // Clear the image state
    setProductImage(null);

    // Clear the product image from productDetails
    setProductDetails({ ...productDetails, product_image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://server.robogearbd.com/product/update-product/${props.productId}`,
        productDetails,
      );
      props.setIsUpdatePopupOpen(false);
      props.fetchData();
      toast.success("Product updated successfully!", {
        position: "bottom-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating product:", error.message);
      toast.error("Failed to update product!", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="add-product-overlay fixed left-[50%] top-[50%] z-50 h-screen w-screen -translate-x-[50%] -translate-y-[50%] bg-[#00000090]">
      <div className="add-product-window absolute left-[50%] top-[50%] h-[80%] w-[70%] -translate-x-[50%] -translate-y-[50%] overflow-y-auto rounded-lg border bg-white">
        <div className="top_row flex items-center justify-between border-b px-5 py-3">
          <div className="left text-2xl font-semibold text-blue-500">
            Update Existing Product
          </div>
          <div className="right">
            <button
              className="rounded-lg bg-rose-500 px-5 py-2 font-semibold text-white hover:bg-rose-600"
              onClick={() => props.setIsUpdatePopupOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
        <div className="add_product p-5">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-10">
              <div className="left col-span-2 grid grid-cols-5 gap-5">
                <div className="col-span-1">
                  <label
                    htmlFor="product_id"
                    className="mb-2 block text-sm font-medium text-gray-600"
                  >
                    Product Id
                  </label>
                  <input
                    type="number"
                    id="product_id"
                    name="product_id"
                    value={productDetails.product_id}
                    onChange={handleChange}
                    className="w-full cursor-not-allowed rounded-md border px-4 py-2 focus:border-rose-500 focus:outline-none"
                    required
                    readOnly
                    placeholder="Enter code"
                  />
                </div>
                <div className="col-span-4">
                  <label
                    htmlFor="product_name"
                    className="mb-2 block text-sm font-medium text-gray-600"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="product_name"
                    name="product_name"
                    value={productDetails.product_name}
                    onChange={handleChange}
                    className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    required
                    autoFocus
                    placeholder="Enter Product Name"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-600"
                  >
                    Product Category
                  </label>
                  <select
                    type="text"
                    id="category"
                    name="category"
                    value={productDetails.category}
                    onChange={handleChange}
                    className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    required
                  >
                    <option value="" disabled>
                      Select Product Category
                    </option>
                    <option value="arduino">Arduino</option>
                    <option value="raspberry">Raspberry Pi</option>
                    <option value="sensor">Sensors</option>
                    <option value="iot">Internet of Things</option>
                    <option value="motors">Motors</option>
                    <option value="modules">Modules and Driver</option>
                    <option value="boards">Development Boards</option>
                    <option value="learning-kit">Learning Kit</option>
                    <option value="batteries">Batteries and charger</option>
                    <option value="connector">Connectors</option>
                    <option value="tools">Tools and Accessories</option>
                    <option value="display">Display</option>
                    <option value="wires">Wires and Cables</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="tags"
                    className="mb-2 block text-sm font-medium text-gray-600"
                  >
                    Product Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={productDetails.tags}
                    onChange={handleChange}
                    className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    placeholder="type your tags separated with comma (eg. arduino, sensor, motor)"
                  />
                </div>
                <div className="col-span-5">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-600"
                  >
                    Product Description
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    value={productDetails.description}
                    onChange={handleChange}
                    className="h-[350px] w-full resize-none rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    placeholder="product description here..."
                  />
                </div>
                <div className="action_button col-span-5">
                  <button
                    type="submit"
                    className="mx-auto block rounded-lg bg-green-500 px-8 py-2 font-semibold text-white hover:bg-green-600"
                  >
                    Update Product
                  </button>
                </div>
              </div>
              <div className="right col-span-1">
                {/* <div className="product_image">
                  <h3 className="mb-3 text-lg font-medium text-gray-600">
                    Click below to add image
                  </h3>
                  <label
                    htmlFor="product_image"
                    className="mb-2 block h-[400px] w-[400px] cursor-pointer"
                  >
                    {productImage ? (
                      <img
                        src={productImage}
                        alt="Product"
                        className="h-full w-full rounded-lg border object-cover"
                      />
                    ) : (
                      <img
                        src={`https://server.robogearbd.com/product_images/${productDetails.product_image}`}
                        alt="Product"
                        className="h-full w-full rounded-lg border object-cover"
                      />
                    )}
                  </label>
                  <input
                    type="file"
                    name="product_image"
                    id="product_image"
                    accept="image/*"
                    readOnly
                    onChange={handleImageChange}
                  />
                </div> */}
                <div className="product_image">
                  <h3 className="mb-3 text-lg font-medium text-gray-600">
                    Product Image
                  </h3>
                  <div
                    htmlFor="product_image"
                    className="mb-2 block h-[400px] w-[400px]"
                  >
                    <img
                      src={`https://server.robogearbd.com/product_images/${productDetails.product_image}`}
                      alt="Product"
                      className="h-full w-full rounded-lg border object-cover"
                    />
                  </div>
                </div>
                {productImage && (
                  <div
                    className="mx-auto mt-5 w-max cursor-pointer rounded bg-rose-500 px-5 py-2 text-sm text-white hover:bg-rose-600"
                    onClick={() => handleImageRemove()}
                  >
                    X Remove Image
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPopup;
