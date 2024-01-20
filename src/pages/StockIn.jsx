import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import StockInPopup from "../components/stock_in/StockInPopup";
import StockInTable from "../components/stock_in/StockInTable";

const StockIn = () => {
  const [message, setMessage] = useState(null);
  const [data, setData] = useState([]);
  const [isStockInPopupOpen, setIsStockInPopupOpen] = useState(false);

  const [formData, setFormData] = useState({
    product_id: "",
    product_name: "",
    product_image: "",
    buying_price: "",
    selling_price: "",
    qty: "",
  });

  const { product_id, buying_price, selling_price, qty } = formData;

  const formDataToSend = {
    product_id,
    buying_price,
    selling_price,
    qty,
  };

  // get all stock in product list from database
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/products/all-stock-in-product",
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStockInPopup = () => {
    setIsStockInPopupOpen(!isStockInPopupOpen);
    setFormData({
      product_id: "",
      product_name: "",
      product_image: "",
      buying_price: "",
      selling_price: "",
      qty: "",
    });
  };

  return (
    <div className="relative h-[calc(100vh-81px)] overflow-y-auto p-5">
      <h3 className="mb-5 text-lg font-semibold text-blue-600">
        Stock In Products
      </h3>
      <StockInTable data={data} />
      <button className="fixed bottom-0 right-0 m-8 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-blue-600 text-4xl text-white shadow-lg">
        <IoMdAdd
          onClick={() => {
            handleStockInPopup();
          }}
          className="transition-all hover:rotate-90"
        />
      </button>
      {isStockInPopupOpen && (
        <StockInPopup
          handleStockInPopup={handleStockInPopup}
          formData={formData}
          setFormData={setFormData}
          setMessage={setMessage}
          setIsStockInPopupOpen={setIsStockInPopupOpen}
          fetchData={fetchData}
          formDataToSend={formDataToSend}
        />
      )}
      {message && (
        <div className="message fixed bottom-0 left-[50%] z-50 my-10 -translate-x-[50%] rounded-lg border bg-green-100 px-10 py-2 text-sm shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
};

export default StockIn;
