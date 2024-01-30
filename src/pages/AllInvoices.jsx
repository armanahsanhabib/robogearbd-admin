import { useEffect, useState } from "react";
import { IoCreate } from "react-icons/io5";
import AllInvoicesTable from "../components/all_invoices/AllInvoicesTable";

const AllInvoices = () => {
  const [data, setData] = useState([]);

  // get all stock in product list from database
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://robogear-bd-97bac4d16518.herokuapp.com/products/all-invoices",
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
        <h3 className="text-3xl font-semibold text-rose-600">All invoices</h3>
        <a
          href="/create-invoice"
          className="flex items-center gap-2 rounded bg-green-500 px-5 py-2 text-white hover:bg-green-600"
        >
          <IoCreate className="text-xl" /> Create new invoice
        </a>
      </div>
      <AllInvoicesTable data={data} />
    </div>
  );
};

export default AllInvoices;
