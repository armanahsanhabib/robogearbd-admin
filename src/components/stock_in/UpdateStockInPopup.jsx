/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const UpdateStockInPopup = (props) => {
  const [stockInData, setStockInData] = useState({
    product_id: "",
    product_name: "",
    product_image: "",
    buying_price: "",
    selling_price: "",
    qty: "",
  });

  useEffect(() => {
    fetchStockInDetails();
  }, []);

  const fetchStockInDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/product/stock-in-product-details/${
          props._id
        }`,
      );

      setStockInData(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error.message);
    }
  };

  const handleChange = (e) => {
    setStockInData({ ...stockInData, [e.target.name]: e.target.value });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URI}/product/update-stock-in-product/${
          stockInData._id
        }`,
        stockInData,
      );

      if (response.status === 200) {
        console.log("Stock-in product updated successfully");
        toast.success("Stock-in product updated successfully!", {
          position: "bottom-center",
          autoClose: 3000,
        });
        props.fetchData();
        props.setIsUpdatePopupOpen(false);
      } else {
        console.error("Failed to update stock-in product", response.statusText);
        toast.error("Failed to update stock-in product!", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update stock-in product!", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="update-stock-in-overlay fixed left-[50%] top-[50%] z-50 h-screen w-screen -translate-x-[50%] -translate-y-[50%] bg-[#00000090]">
      <div className="update-stock-in-window absolute left-[50%] top-[50%] h-max w-[1000px] -translate-x-[50%] -translate-y-[50%] rounded-lg border bg-white">
        {/* Top row */}
        <div className="top_row flex items-center justify-between border-b px-5 py-3">
          <div className="left text-2xl font-semibold text-blue-500">
            Update Stock In Data
          </div>
          <div className="right">
            <button
              className="rounded-lg bg-gray-300 px-5 py-2 font-semibold text-gray-800 hover:bg-rose-600 hover:text-white"
              onClick={() => props.setIsUpdatePopupOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
        <div className="stock_in_product p-5">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 grid-rows-2 gap-5">
              {/* Product information row */}
              <div className="left col-span-1 row-span-2">
                <div className="mb-2 block text-sm font-medium text-gray-600">
                  Product Image
                </div>
                {stockInData.product_image ? (
                  <img
                    src={`${import.meta.env.VITE_SERVER_URI}/product_images/${
                      stockInData.product_image
                    }`}
                    alt="Product Image"
                    className="mx-auto h-[134px] w-full rounded-lg border bg-gray-50 object-cover"
                  />
                ) : (
                  <div className="mx-auto flex h-[calc(100%-26px)] items-center justify-center rounded-lg border bg-gray-50 object-cover">
                    No image available
                  </div>
                )}
              </div>
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
                  value={stockInData.product_id}
                  readOnly
                  className="w-full cursor-not-allowed rounded-md border px-4 py-2 focus:border-rose-500 focus:outline-none"
                  required
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
                  value={stockInData.product_name}
                  onChange={handleChange}
                  className="w-full cursor-not-allowed rounded-md border px-4 py-2 focus:border-rose-500 focus:outline-none"
                  required
                  readOnly
                  placeholder="Enter Product Name"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="buying_price"
                  className="mb-2 block text-sm font-medium text-gray-600"
                >
                  Buying price
                </label>
                <input
                  type="number"
                  id="buying_price"
                  name="buying_price"
                  value={stockInData.buying_price}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                  placeholder="cost..."
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="selling_price"
                  className="mb-2 block text-sm font-medium text-gray-600"
                >
                  Selling Price
                </label>
                <input
                  type="number"
                  id="selling_price"
                  name="selling_price"
                  value={stockInData.selling_price}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                  placeholder="price..."
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="qty"
                  className="mb-2 block text-sm font-medium text-gray-600"
                >
                  Stock in
                </label>
                <input
                  type="number"
                  id="qty"
                  name="qty"
                  value={stockInData.qty}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                  placeholder="Stock in"
                />
              </div>
              <div className="bottom col-span-6 mb-2 mt-3 text-center">
                <button
                  type="button"
                  className="mr-5 rounded-lg bg-rose-500 px-5 py-2 font-semibold text-white hover:bg-rose-600"
                  onClick={() => props.setIsUpdatePopupOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-green-500 px-8 py-2 font-semibold text-white hover:bg-green-600"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStockInPopup;
