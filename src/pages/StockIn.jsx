import axios from "axios"; // Import axios
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import Header from "../components/Header";
import DeletePopup from "../components/stock_in/DeletePopup";
import StockInPopup from "../components/stock_in/StockInPopup";
import StockInTable from "../components/stock_in/StockInTable";
import UpdateStockInPopup from "../components/stock_in/UpdateStockInPopup";

const StockIn = () => {
  const [data, setData] = useState([]);
  const [isStockInPopupOpen, setIsStockInPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

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
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/product/all-stock-in-products`,
      );

      // Check if the response is successful
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }

      // Reverse the order of data
      const reversedData = response.data.reverse();

      // Set the reversed data
      setData(reversedData);
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

  // delete an item from list
  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_SERVER_URI
        }/product/remove-stock-in-product/${productId}`,
      );

      console.log(`Stock-in data with ID ${productId} deleted successfully.`);
      toast.success("Stock in data deleted successfully!", {
        position: "bottom-center",
        autoClose: 3000,
      });
      setIsDeletePopupOpen(false);
      fetchData();
    } catch (error) {
      console.error(`Failed to delete Stock-in data with ID ${productId}.`);
      toast.error("Error: couldn't delete stock in data!", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  const handleDeletePopupClick = (productId) => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setSelectedProductId(productId);
  };

  const handleUpdatePopupClick = (productId) => {
    setSelectedProductId(productId);
    setIsUpdatePopupOpen(!isUpdatePopupOpen);
  };

  return (
    <div className="relative m-5 w-[calc(100%-300px)] overflow-hidden rounded-lg border bg-white p-3">
      <Header
        title="Stock in Products"
        action={
          <button
            className="flex items-center gap-2 rounded bg-green-500 px-5 py-2 text-white hover:bg-green-600"
            onClick={() => {
              handleStockInPopup();
            }}
          >
            <IoMdAdd className="text-xl" /> Stock in
          </button>
        }
      />
      <main className="h-[calc(100%-65px)] overflow-auto p-3">
        <StockInTable
          data={data}
          handleDeletePopupClick={handleDeletePopupClick}
          handleUpdatePopupClick={handleUpdatePopupClick}
        />
      </main>
      {isStockInPopupOpen && (
        <StockInPopup
          handleStockInPopup={handleStockInPopup}
          formData={formData}
          setFormData={setFormData}
          setIsStockInPopupOpen={setIsStockInPopupOpen}
          fetchData={fetchData}
          formDataToSend={formDataToSend}
        />
      )}
      {isDeletePopupOpen && (
        <DeletePopup
          handleDelete={handleDelete}
          handleDeletePopupClick={handleDeletePopupClick}
          _id={selectedProductId}
          data={data}
        />
      )}
      {isUpdatePopupOpen && (
        <UpdateStockInPopup
          setIsUpdatePopupOpen={setIsUpdatePopupOpen}
          _id={selectedProductId}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default StockIn;
