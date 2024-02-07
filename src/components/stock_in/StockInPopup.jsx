/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const StockInPopup = (props) => {
  // manage states for product suggestions list
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          "https://robogear-bd-97bac4d16518.herokuapp.com/products/all-products",
        );
        const data = await response.json();

        const filteredSuggestions = data.filter((product) =>
          product.product_name
            .toLowerCase()
            .includes(props.formData.product_name.toLowerCase()),
        );

        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    if (props.formData.product_name && showSuggestions) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [props.formData.product_name, showSuggestions]);

  // handle suggestion click
  const handleSelectProduct = (product) => {
    props.setFormData({
      product_id: product.product_id,
      product_name: product.product_name,
      buying_price: product.buying_price,
      selling_price: product.selling_price,
      product_image: product.product_image,
    });

    // Hide suggestions after selecting a product
    setShowSuggestions(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    props.setFormData({
      ...props.formData,
      [name]: value,
    });

    if (name === "product_name") {
      setShowSuggestions(true);
    }
  };

  // post product stock in to database
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObject = new FormData();
      for (const key in props.formDataToSend) {
        formDataObject.append(key, props.formDataToSend[key]);
      }

      const response = await fetch(
        "https://robogear-bd-97bac4d16518.herokuapp.com/products/stock-in-product",
        {
          method: "POST",
          body: JSON.stringify(props.formDataToSend),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        console.log("Stock in product successfully");
        props.setMessage("Stock in product successfully");
        setTimeout(() => {
          props.setMessage(null);
        }, 3000);
        props.setIsStockInPopupOpen(false);
        props.fetchData();
      } else {
        console.error("Failed to add product", response.statusText);
        props.setMessage("Failed to add product!");
        setTimeout(() => {
          props.setMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-product-overlay fixed left-[50%] top-[50%] z-50 h-screen w-screen -translate-x-[50%] -translate-y-[50%] bg-[#00000090]">
      <div className="add-product-window absolute left-[50%] top-[50%] h-max w-[1000px] -translate-x-[50%] -translate-y-[50%] rounded-lg border bg-white">
        {/* Top row */}
        <div className="top_row flex items-center justify-between border-b px-5 py-3">
          <div className="left text-2xl font-semibold text-blue-500">
            Stock In Product
          </div>
          <div className="right">
            <button
              className="rounded-lg bg-gray-300 px-5 py-2 font-semibold text-gray-800 hover:bg-rose-600 hover:text-white"
              onClick={() => props.handleStockInPopup()}
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
                {props.formData.product_image ? (
                  <img
                    src={`https://robogear-bd-97bac4d16518.herokuapp.com/product_images/${props.formData.product_image}`}
                    alt="Product Image"
                    className="mx-auto h-[134px] w-full rounded-lg border bg-gray-50 object-cover"
                  />
                ) : (
                  <div className="mx-auto flex h-[calc(100%-26px)] items-center justify-center rounded-lg border bg-gray-50 object-cover">
                    image
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
                  value={props.formData.product_id}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                  placeholder="Enter code"
                />
              </div>
              <div className="relative col-span-4">
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
                  value={props.formData.product_name}
                  onChange={handleChange}
                  className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                  required
                  autoFocus
                  placeholder="Enter Product Name"
                />
                {suggestions.length > 0 && (
                  <ul className="suggestion-list absolute left-0 top-[80px] z-50 max-h-[300px] w-full overflow-y-auto rounded border bg-gray-50 shadow">
                    {suggestions.map((product) => (
                      <li
                        className="flex cursor-pointer gap-3 border-b px-3 py-2 hover:bg-gray-100"
                        key={product._id}
                        onClick={() => handleSelectProduct(product)}
                      >
                        <div className="left">
                          <img
                            src={`https://robogear-bd-97bac4d16518.herokuapp.com/product_images/${product.product_image}`}
                            alt={product.product_name}
                            className="h-[45px]"
                          />
                        </div>
                        <div className="right">
                          <h3 className="text-blue-600">
                            {product.product_name}
                          </h3>
                          <p className="text-sm font-[300]">
                            {`Price: ${product.selling_price}`}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
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
                  value={props.formData.buying_price}
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
                  value={props.formData.selling_price}
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
                  value={props.formData.qty}
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
                  onClick={() => props.handleStockInPopup()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-green-500 px-8 py-2 font-semibold text-white hover:bg-green-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StockInPopup;
