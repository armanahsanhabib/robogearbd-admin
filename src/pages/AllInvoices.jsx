import axios from "axios";
import { useEffect, useState } from "react";
import { IoCreate } from "react-icons/io5";
import { toast } from "react-toastify";
import Header from "../components/Header";
import AllInvoicesTable from "../components/all_invoices/AllInvoicesTable";
import InvoiceDeletePopup from "../components/all_invoices/InvoiceDeletePopup";
import InvoicePopup from "../components/all_invoices/InvoicePopup";

const AllInvoices = () => {
  const [data, setData] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState({
    receiptNo: 0,
    customerInfo: {
      customer_name: "",
      customer_phone: "",
      customer_address: "",
    },
    invoiceProducts: [],
    billCalculation: {
      subTotal: 0,
      discount: 0,
      totalPayable: 0,
      delivery: "",
    },
  });
  const [isInvoicePopupOpen, setInvoicePopupOpen] = useState(false);
  const [isInvoiceDeletePopupOpen, setInvoiceDeletePopupOpen] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState(0);

  // Fetch all invoices
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/order/all-invoices`,
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Fetch specific invoice details based on ID
  const fetchInvoiceDetails = async (receiptNo) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/order/invoice-details/${receiptNo}`,
      );
      setInvoiceDetails(response.data);
    } catch (error) {
      console.error("Error fetching invoice details:", error.message);
    }
  };

  // Delete invoice based on ID
  const handleDeleteInvoice = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URI}/order/delete-invoice/${invoiceNo}`,
      );
      toast.success("Invoice Deleted Successfully!", {
        position: "bottom-center",
        autoClose: 3000,
      });
      // Refetch data after deletion
      fetchData();
      // Close the delete popup
      setInvoiceDeletePopupOpen(false);
    } catch (error) {
      console.error("Error deleting invoice:", error.message);
      toast.error("Error: Invoice can't be deleted!", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  // Handle opening/closing invoice popup and fetch details
  const handleInvoicePopup = (receiptNo) => {
    setInvoiceNo(receiptNo);
    setInvoicePopupOpen(!isInvoicePopupOpen);
    // Fetch details only if the popup is opening
    if (!isInvoicePopupOpen) {
      fetchInvoiceDetails(receiptNo);
    }
  };

  // Handle opening/closing invoice popup and fetch details
  const handleInvoiceDeletePopup = (receiptNo) => {
    setInvoiceNo(receiptNo);
    setInvoiceDeletePopupOpen(!isInvoiceDeletePopupOpen);
    // Fetch details only if the popup is opening
    if (!isInvoiceDeletePopupOpen) {
      fetchInvoiceDetails(receiptNo);
    }
  };

  // Fetch data on initial render
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative m-5 w-[calc(100%-300px)] overflow-hidden rounded-lg border bg-white p-3">
      <Header
        title="All invoices"
        action={
          <a
            href="/create-invoice"
            className="flex items-center gap-2 rounded bg-green-500 px-5 py-2 text-white hover:bg-green-600"
          >
            <IoCreate className="text-xl" /> Create new invoice
          </a>
        }
      />
      <main className="h-[calc(100%-65px)] overflow-auto p-3">
        <AllInvoicesTable
          data={data}
          handleInvoicePopup={handleInvoicePopup}
          handleInvoiceDeletePopup={handleInvoiceDeletePopup}
        />
      </main>
      {isInvoicePopupOpen && (
        <InvoicePopup
          handleInvoicePopup={handleInvoicePopup}
          invoiceDetails={invoiceDetails}
        />
      )}
      {isInvoiceDeletePopupOpen && (
        <InvoiceDeletePopup
          handleInvoiceDeletePopup={handleInvoiceDeletePopup}
          invoiceDetails={invoiceDetails}
          handleDeleteInvoice={handleDeleteInvoice}
        />
      )}
    </div>
  );
};

export default AllInvoices;
