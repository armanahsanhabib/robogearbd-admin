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
        // "https://robogear-bd-97bac4d16518.herokuapp.com/products/all-stock-in-product",
        "https://robogearbd-admin.netlify.app/products/all-stock-in-product",
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
    <div className="relative h-screen overflow-y-auto p-5">
      <div className="mb-3 flex items-center justify-between border bg-slate-100 p-3">
        <h3 className="text-3xl font-semibold text-rose-600">
          Stock in Products
        </h3>
        <button
          className="flex items-center gap-2 rounded bg-green-500 px-5 py-2 text-white hover:bg-green-600"
          onClick={() => {
            handleStockInPopup();
          }}
        >
          <IoMdAdd className="text-xl" /> Stock in
        </button>
      </div>
      <StockInTable data={data} />
      {/* <button className="fixed bottom-0 right-0 m-8 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-blue-600 text-4xl text-white shadow-lg">
        <IoMdAdd
          onClick={() => {
            handleStockInPopup();
          }}
          className="transition-all hover:rotate-90"
        />
      </button> */}
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
