import { useEffect, useRef, useState } from "react";
import AddProductItemForm from "../components/create_invoice/AddProductItemForm";
import CustomerDetailsForm from "../components/create_invoice/CustomerDetailsForm";
import GeneratedInvoice from "../components/create_invoice/GeneratedInvoice";
import SavePdfForm from "../components/create_invoice/SavePdfForm";

const CreateInvoice = () => {
  const componentRef = useRef();

  // set invoice no
  const [invoiceNo, setInvoiceNo] = useState(0);

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
  const [showSuggestions, setShowSuggestions] = useState(true);

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
    setInvoiceProducts([...invoiceProducts, invoiceItem]);
    setInvoiceItem({
      product_id: "",
      product_name: "",
      buying_price: "",
      selling_price: "",
      qty: "",
    });
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
    setBillCalculation({ ...billCalculation, [e.target.name]: e.target.value });
  };

  // calculate and update subtotal bill when new items added
  useEffect(() => {
    const subtotal = invoiceProducts.reduce(
      (accumulator, item) => accumulator + item.selling_price * item.qty,
      0,
    );
    setBillCalculation((prevTotal) => ({ ...prevTotal, subTotal: subtotal }));
  }, [invoiceProducts]);

  // calculate

  // handle product suggestions when typing a product name
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          "https://robogear-bd-97bac4d16518.herokuapp.com/products/all-product",
        );
        const data = await response.json();

        const filteredSuggestions = data.filter((product) =>
          product.product_name
            .toLowerCase()
            .includes(invoiceItem.product_name.toLowerCase()),
        );

        setSuggestions(filteredSuggestions);
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
  };

  // save invoice button click
  const saveInvoice = async () => {
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
        // setMessage("Stock in product successfully");
        // setTimeout(() => {
        //   setMessage(null);
        // }, 3000);
      } else {
        console.error("Failed to save invoice!", response.statusText);
        // setMessage("Failed to add product!");
        // setTimeout(() => {
        //   setMessage(null);
        // }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative h-[calc(100vh-81px)] overflow-y-auto p-5">
      {/* Create Invoice Main container */}
      <div className="flex gap-10">
        {/* Left Content */}
        <div className="left flex w-[40%] flex-col gap-5">
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
          />
          {/* Discount and Save PDF Button section */}
          <SavePdfForm
            billCalculation={billCalculation}
            handleBillChange={handleBillChange}
            componentRef={componentRef}
            saveInvoice={saveInvoice}
          />
        </div>
        {/* Right Content (Main Invoice) */}
        <GeneratedInvoice
          customerInfo={customerInfo}
          invoiceProducts={invoiceProducts}
          billCalculation={billCalculation}
          componentRef={componentRef}
          receiptNo={invoiceNo}
        />
      </div>
    </div>
  );
};

export default CreateInvoice;
