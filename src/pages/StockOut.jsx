import axios from "axios"; // Import Axios
import { useEffect, useState } from "react";
import Header from "../components/Header";
import StockOutTable from "../components/stock_out/StockOutTable";

const StockOut = () => {
  const [data, setData] = useState([]);

  // get all stock out product list from database using Axios
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/product/all-stock-out-products`,
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      // Sort the data based on date in descending order
      const sortedData = response.data.sort(
        (a, b) => new Date(b.receiptNo) - new Date(a.receiptNo),
      );

      setData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative m-5 w-[calc(100%-300px)] overflow-hidden rounded-lg border bg-white p-3">
      <Header title="Stock Out Products" action={true} />
      <main className="h-[calc(100%-65px)] overflow-auto p-3">
        <StockOutTable data={data} />
      </main>
    </div>
  );
};

export default StockOut;
