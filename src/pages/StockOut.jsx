import { useEffect, useState } from "react";
import StockOutTable from "../components/stock_out/StockOutTable";

const StockOut = () => {
  const [data, setData] = useState([]);

  // get all stock in product list from database
  const fetchData = async () => {
    try {
      const response = await fetch(
        // "https://robogear-bd-97bac4d16518.herokuapp.com/products/all-stock-out-products",
        "http://localhost:3000/products/all-stock-out-products",
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

  return (
    <div className="relative h-screen overflow-y-auto p-5">
      <div className="mb-3 flex items-center justify-between border bg-slate-100 p-3">
        <h3 className="text-3xl font-semibold text-rose-600">
          Stock Out Products
        </h3>
      </div>
      <StockOutTable data={data} />
    </div>
  );
};

export default StockOut;
