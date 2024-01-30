import { useEffect, useState } from "react";
import { FaFileInvoice } from "react-icons/fa";
import AddProductItemForm from "../components/create_invoice/AddProductItemForm";
import CustomerDetailsForm from "../components/create_invoice/CustomerDetailsForm";
import GeneratedInvoice from "../components/create_invoice/GeneratedInvoice";
import SavePdfForm from "../components/create_invoice/SavePdfForm";

const CreateInvoice = () => {
  // set invoice no
  const [invoiceNo, setInvoiceNo] = useState(0);

  // set invoice No
  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await fetch(
          "https://robogear-bd-97bac4d16518.herokuapp.com/products/all-invoice",
        );
        const data = await response.json();

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
    setInvoiceItem({ ...invoiceItem, [e.target.name]: e.target.value });

    // Show suggestions when user types in the input field
    if (e.target.name === "product_name") {
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
        const response = await fetch(
          "https://robogear-bd-97bac4d16518.herokuapp.com/products/all-product",
        );
        const data = await response.json();

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

  // save invoice button click
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("bg-white-100");

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

      console.log(JSON.stringify(invoiceDataToSave));

      try {
        const response = await fetch(
          "https://robogear-bd-97bac4d16518.herokuapp.com/products/save-invoice",
          {
            method: "POST",
            body: JSON.stringify(invoiceDataToSave),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
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
          setMessageColor("bg-green-200");
          setMessage("Invoice Saved successfully");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        } else {
          console.error("Failed to save invoice!", response.statusText);
          // setMessage("Failed to add product!");
          // setTimeout(() => {
          //   setMessage(null);
          // }, 3000);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("Error: could not save product!");
        setMessageColor("bg-amber-200");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } else {
      console.log("Fill all data before saving!");
      setMessage("Fill all data before saving!");
      setMessageColor("bg-rose-200");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="relative h-screen overflow-y-auto p-5">
      <div className="mb-3 flex items-center justify-between border bg-slate-100 p-3">
        <h3 className="text-3xl font-semibold text-rose-600">Create Invoice</h3>
        <a
          href="/all-invoices"
          className="flex items-center gap-2 rounded bg-green-500 px-5 py-2 text-white hover:bg-green-600"
        >
          <FaFileInvoice className="text-xl" /> Show All invoice
        </a>
      </div>
      {/* Create Invoice Main container */}
      <div className="flex justify-between">
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
      </div>
      {message && (
        <div
          className={`message fixed bottom-0 left-[50%] z-50 my-10 -translate-x-[50%] rounded-lg border px-10 py-2 text-sm shadow-lg ${messageColor}`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default CreateInvoice;
