import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import CustomersTable from "../components/our_customers/CustomersTable";

const OurCustomers = () => {
  const [data, setData] = useState([]);

  // Fetch all invoices
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/user/users`,
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Fetch data on initial render
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative m-5 w-[calc(100%-300px)] overflow-hidden rounded-lg border bg-white p-3">
      <Header title="Our Customers" />
      <main className="h-[calc(100%-65px)] overflow-auto p-3">
        <CustomersTable data={data} />
      </main>
    </div>
  );
};

export default OurCustomers;
