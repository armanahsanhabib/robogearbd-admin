import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import AddNewProductPopup from "../components/products_management/AddNewProductPopup";
import DeletePopup from "../components/products_management/DeletePopup";
import ProductsTable from "../components/products_management/ProductsTable";

const ProductsManagement = () => {
  const [isProductAddPopupOpen, setIsProductAddPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
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
        "http://localhost:3000/products/all-product",
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

  const handleDeletePopupClick = () => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };

  return (
    <div className="relative h-[calc(100vh-81px)] overflow-y-auto p-5">
      <h3 className="mb-5 text-lg font-semibold text-blue-600">
        Products Management
      </h3>
      <ProductsTable
        data={data}
        handleDeletePopupClick={handleDeletePopupClick}
      />
      <button className="fixed bottom-0 right-0 m-8 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-blue-600 text-4xl text-white shadow-lg">
        <IoMdAdd
          onClick={() => {
            handleProductAddPopup();
          }}
          className="transition-all hover:rotate-90"
        />
      </button>
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
        />
      )}
      {/* <DeletePopup handleDelete={handleDelete} /> */}
    </div>
  );
};

export default ProductsManagement;
