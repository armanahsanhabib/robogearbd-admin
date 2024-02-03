import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import AddNewProductPopup from "../components/products_management/AddNewProductPopup";
import DeletePopup from "../components/products_management/DeletePopup";
import ProductsTable from "../components/products_management/ProductsTable";

const ProductsManagement = () => {
  const [isProductAddPopupOpen, setIsProductAddPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [message, setMessage] = useState(null);
  const [data, setData] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [formData, setFormData] = useState({
    product_id: "",
    product_name: "",
    category: "",
    tags: "",
    description: "",
  });

  // get all product from database
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://robogear-bd-97bac4d16518.herokuapp.com/products/all-products",
        // "http://localhost:3000/products/all-products",
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

  // delete an item from list
  const handleDelete = async (productId) => {
    try {
      // Send a DELETE request to the server to delete the product
      const response = await fetch(
        // `https://robogear-bd-97bac4d16518.herokuapp.com/products/remove-product/${productId}`,
        `http://localhost:3000/products/remove-product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        console.log(`Product with ID ${productId} deleted successfully.`);
        setIsDeletePopupOpen(false);
        // Optionally, you can update the UI or fetch the updated product list from the server.
      } else {
        console.error(`Failed to delete product with ID ${productId}.`);
      }
    } catch (error) {
      console.error("Error while deleting product:", error);
    }
  };

  const handleProductAddPopup = () => {
    setIsProductAddPopupOpen(!isProductAddPopupOpen);
    setFormData(() => ({
      product_id: "",
      product_name: "",
      category: "",
      tags: "",
      description: "",
    }));
    setProductImage(null);
  };

  const handleDeletePopupClick = (productId) => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setSelectedProductId(productId);
  };

  return (
    <div className="h-screen overflow-y-auto p-5">
      <div className="mb-3 flex items-center justify-between border bg-slate-100 p-3">
        <h3 className="text-3xl font-semibold text-rose-600">
          Products Management
        </h3>
        <button
          className="flex items-center gap-2 rounded bg-green-500 px-5 py-2 text-white hover:bg-green-600"
          onClick={() => {
            handleProductAddPopup();
          }}
        >
          <IoMdAdd className="text-xl" /> Add new Product
        </button>
      </div>
      <ProductsTable
        data={data}
        handleDeletePopupClick={handleDeletePopupClick}
      />
      {/* <button className="fixed bottom-0 right-0 m-8 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-blue-600 text-4xl text-white shadow-lg">
        <IoMdAdd
          onClick={() => {
            handleProductAddPopup();
          }}
          className="transition-all hover:rotate-90"
        />
      </button> */}
      {message && (
        <div className="message fixed bottom-0 left-[50%] z-50 my-10 -translate-x-[50%] rounded-lg border bg-green-100 px-10 py-2 text-sm shadow-lg">
          {message}
        </div>
      )}
      {isProductAddPopupOpen && (
        <AddNewProductPopup
          setMessage={setMessage}
          handleProductAddPopup={handleProductAddPopup}
          data={data}
          setIsProductAddPopupOpen={setIsProductAddPopupOpen}
          fetchData={fetchData}
          productImage={productImage}
          setProductImage={setProductImage}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {isDeletePopupOpen && (
        <DeletePopup
          handleDelete={handleDelete}
          handleDeletePopupClick={handleDeletePopupClick}
          _id={selectedProductId}
        />
      )}
    </div>
  );
};

export default ProductsManagement;
