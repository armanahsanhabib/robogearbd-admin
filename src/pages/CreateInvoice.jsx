import axios from "axios";
import { useEffect, useState } from "react";
import { FaFileInvoice } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import AddProductItemForm from "../components/create_invoice/AddProductItemForm";
import CustomerDetailsForm from "../components/create_invoice/CustomerDetailsForm";
import GeneratedInvoice from "../components/create_invoice/GeneratedInvoice";
import SavePdfForm from "../components/create_invoice/SavePdfForm";

const CreateInvoice = () => {
  const navigate = useNavigate();
  // set invoice no
  const [invoiceNo, setInvoiceNo] = useState(0);

  // set invoice No
  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URI}/order/all-invoices`,
        );
        const data = response.data;

        if (data.length > 0) {
          // Find the maximum invoice number
          const maxInvoiceNo = Math.max(
            ...data.map((invoice) => invoice.receiptNo),
          );
          // Set invoice number to one greater than the maximum existing invoice number
          setInvoiceNo(maxInvoiceNo + 1);
        } else {
          setInvoiceNo(123001);
        }
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    fetchInvoiceData();
  }, []);

  // manage states for customer information
  const [customerInfo, setCustomerInfo] = useState({
    customer_name: "",
    customer_phone: "",
    customer_address: "",
  });

  // states for storing All invoice products
  const [invoiceProducts, setInvoiceProducts] = useState([]);

  // manage states for single invoice items
  const [invoiceItem, setInvoiceItem] = useState({
    product_id: "",
    product_name: "",
    buying_price: "",
    selling_price: "",
    qty: "",
  });

  // states for managing total bill
  const [billCalculation, setBillCalculation] = useState({
    subTotal: 0,
    discount: 0,
    totalPayable: 0,
    delivery: "",
  });

  // manage states for product suggestions list
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // handle customer form change
  const handleCustomerFormChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  // handle invoice item form change
  const handleInvoiceItemFormChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    // Parse the value as a number if it represents a numeric field
    if (
      name === "product_id" ||
      name === "buying_price" ||
      name === "selling_price" ||
      name === "qty"
    ) {
      parsedValue = parseFloat(value);
    }

    setInvoiceItem({ ...invoiceItem, [name]: parsedValue });

    // Show suggestions when user types in the input field
    if (name === "product_name") {
      setShowSuggestions(true);
    }
  };

  // handle add item to invoice
  const handleAddItemClick = (e) => {
    e.preventDefault();
    if (
      invoiceItem.product_id &&
      invoiceItem.product_name &&
      invoiceItem.selling_price &&
      invoiceItem.qty
    ) {
      setInvoiceProducts([...invoiceProducts, invoiceItem]);
      setInvoiceItem({
        product_id: "",
        product_name: "",
        buying_price: "",
        selling_price: "",
        qty: "",
      });
    }
  };

  // undo last item if exist
  const undoLastItem = () => {
    if (invoiceProducts.length > 0) {
      const updatedInvoiceProducts = [...invoiceProducts];
      updatedInvoiceProducts.pop();
      setInvoiceProducts(updatedInvoiceProducts);
    }
  };

  // handle total bill change
  const handleBillChange = (e) => {
    const { name, value } = e.target;

    // Update the bill calculation state
    setBillCalculation((prevTotal) => ({ ...prevTotal, [name]: value }));
  };

  // calculate and update subtotal and total payable bill when new items added
  useEffect(() => {
    const subtotal = invoiceProducts.reduce(
      (accumulator, item) => accumulator + item.selling_price * item.qty,
      0,
    );
    setBillCalculation((prevTotal) => ({ ...prevTotal, subTotal: subtotal }));
  }, [invoiceProducts]);

  // calculate totalPayable when discount changes
  useEffect(() => {
    const subTotal = parseFloat(billCalculation.subTotal) || 0;
    const discount = parseFloat(billCalculation.discount) || 0;

    // Calculate totalPayable
    const totalPayable = subTotal - discount;

    // Update the state with the new totalPayable
    setBillCalculation((prevTotal) => ({ ...prevTotal, totalPayable }));
  }, [billCalculation.discount, billCalculation.subTotal]);

  // handle product suggestions when typing a product name
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URI}/product/all-products`,
        );
        const data = response.data;

        if (showSuggestions && invoiceItem.product_name) {
          const filteredSuggestions = data.filter((product) =>
            product.product_name
              .toLowerCase()
              .includes(invoiceItem.product_name.toLowerCase()),
          );

          setSuggestions(filteredSuggestions);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    if (invoiceItem.product_name && showSuggestions) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [invoiceItem.product_name, showSuggestions]);

  // handle product select click
  const handleSelectProduct = (product) => {
    setInvoiceItem({
      product_id: product.product_id,
      product_name: product.product_name,
      buying_price: product.buying_price,
      selling_price: product.selling_price,
      qty: 1, // Reset quantity when a new product is selected
    });

    // Hide suggestions after selecting a product
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleSuggestionCloseButton = () => {
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleProductItemClearButton = () => {
    setInvoiceItem({
      product_id: "",
      product_name: "",
      buying_price: "",
      selling_price: "",
      qty: "",
    });
  };

  const saveInvoice = async () => {
    if (
      invoiceNo &&
      customerInfo.customer_name &&
      customerInfo.customer_phone &&
      invoiceProducts.length > 0 &&
      billCalculation.delivery
    ) {
      const invoiceDataToSave = {
        receiptNo: invoiceNo,
        customerInfo: { ...customerInfo },
        invoiceProducts: [...invoiceProducts],
        billCalculation: { ...billCalculation },
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URI}/order/save-invoice`,
          invoiceDataToSave,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 200) {
          console.log("Invoice Saved successfully!");
          setInvoiceNo(invoiceNo + 1);
          setCustomerInfo({
            customer_name: "",
            customer_phone: "",
            customer_address: "",
          });
          setInvoiceProducts([]);
          setBillCalculation({
            subTotal: 0,
            discount: 0,
            totalPayable: 0,
            delivery: "",
          });
          toast.success("Invoice Saved Successfully!", {
            position: "bottom-center",
            autoClose: 3000,
          });
          navigate("/all-invoices");
        } else {
          console.error("Failed to save invoice!", response.statusText);
          toast.error("Failed to save invoice!", {
            position: "bottom-center",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Could not save invoice!", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    } else {
      console.log("Fill all data before saving!");
      toast.warning("Fill all data before saving!", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="relative m-5 w-[calc(100%-300px)] overflow-hidden rounded-lg border bg-white p-3">
      <Header
        title="Create Invoice"
        action={
          <a
            href="/all-invoices"
            className="flex items-center gap-2 rounded bg-orange-500 px-5 py-2 text-white hover:bg-green-600"
          >
            <FaFileInvoice className="text-xl" /> Show All invoice
          </a>
        }
      />
      {/* Create Invoice Main container */}
      <main className="flex justify-between p-3">
        {/* Left Content */}
        <div className="left flex w-[700px] flex-col gap-5">
          {/* Customer Details Form */}
          <CustomerDetailsForm
            customerInfo={customerInfo}
            handleCustomerFormChange={handleCustomerFormChange}
          />
          {/* Add Product Item Form */}
          <AddProductItemForm
            handleAddItemClick={handleAddItemClick}
            handleInvoiceItemFormChange={handleInvoiceItemFormChange}
            invoiceItem={invoiceItem}
            suggestions={suggestions}
            handleSelectProduct={handleSelectProduct}
            undoLastItem={undoLastItem}
            handleSuggestionCloseButton={handleSuggestionCloseButton}
            handleProductItemClearButton={handleProductItemClearButton}
          />
          {/* Discount and Save PDF Button section */}
          <SavePdfForm
            billCalculation={billCalculation}
            handleBillChange={handleBillChange}
            saveInvoice={saveInvoice}
          />
        </div>
        {/* Right Content (Main Invoice) */}
        <GeneratedInvoice
          customerInfo={customerInfo}
          invoiceProducts={invoiceProducts}
          billCalculation={billCalculation}
          receiptNo={invoiceNo}
        />
      </main>
    </div>
  );
};

export default CreateInvoice;
