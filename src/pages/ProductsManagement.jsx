import axios from "axios"; // Import axios
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import Header from "../components/Header";
import AddNewProductPopup from "../components/products_management/AddNewProductPopup";
import DeletePopup from "../components/products_management/DeletePopup";
import ProductsTable from "../components/products_management/ProductsTable";
import UpdateProductPopup from "../components/products_management/UpdateProductPopup";

const ProductsManagement = () => {
  const [isProductAddPopupOpen, setIsProductAddPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
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
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/product/all-products`,
      );

      setData(response.data);
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
      await axios.delete(
        `${
          import.meta.env.VITE_SERVER_URI
        }/product/remove-product/${productId}`,
      );

      console.log(`Product with ID ${productId} deleted successfully.`);
      toast.success("Product deleted successfully!", {
        position: "bottom-center",
        autoClose: 3000,
      });
      setIsDeletePopupOpen(false);
      fetchData();
    } catch (error) {
      console.error(`Failed to delete product with ID ${productId}.`);
      toast.error("Error: couldn't delete product!", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  // handle new product add popup
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

  const handleUpdatePopupClick = (productId) => {
    // Logic to open update product popup
    setIsUpdatePopupOpen(true);
    setSelectedProductId(productId);
  };

  return (
    <div className="m-5 w-[calc(100%-300px)] overflow-hidden rounded-lg border bg-white p-3">
      <Header
        title="Products Management"
        action={
          <button
            className="flex items-center gap-2 rounded bg-green-500 px-5 py-2 text-white hover:bg-green-600"
            onClick={() => {
              handleProductAddPopup();
            }}
          >
            <IoMdAdd className="text-xl" /> Add new Product
          </button>
        }
      />
      <main className="h-[calc(100%-65px)] overflow-auto p-3">
        <ProductsTable
          data={data}
          handleDeletePopupClick={handleDeletePopupClick}
          handleUpdatePopupClick={handleUpdatePopupClick}
        />
      </main>
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
      {isUpdatePopupOpen && (
        <UpdateProductPopup
          formData={formData}
          setIsUpdatePopupOpen={setIsUpdatePopupOpen}
          productId={selectedProductId}
          fetchData={fetchData}
        />
      )}
      {isDeletePopupOpen && (
        <DeletePopup
          handleDelete={handleDelete}
          handleDeletePopupClick={handleDeletePopupClick}
          _id={selectedProductId}
          data={data}
        />
      )}
    </div>
  );
};

export default ProductsManagement;
