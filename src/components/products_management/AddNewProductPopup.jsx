/* eslint-disable react/prop-types */
import { useEffect } from "react";

const AddNewProductPopup = (props) => {
  useEffect(() => {
    // Autofill product_id when component is mounted
    const maxProductId = Math.max(
      ...props.data.map((item) => item.product_id),
      0,
    );
    props.setFormData({ ...props.formData, product_id: maxProductId + 1 });
  }, [props]);

  // handle formdata change
  const handleChange = (e) => {
    props.setFormData({ ...props.formData, [e.target.name]: e.target.value });
  };

  // handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    props.setFormData({ ...props.formData, product_image: file });

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        props.setProductImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // post new product to database
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObject = new FormData();
      for (const key in props.formData) {
        formDataObject.append(key, props.formData[key]);
      }

      const response = await fetch(
        "https://robogear-bd-97bac4d16518.herokuapp.com/products/add-new-product",
        {
          method: "POST",
          body: formDataObject,
        },
      );

      if (response.ok) {
        console.log("Product added successfully");
        props.setMessage("Product added successfully");
        setTimeout(() => {
          props.setMessage(null);
        }, 3000);
        props.setIsProductAddPopupOpen(false);
        props.fetchData();
      } else {
        console.error("Failed to add product", response.statusText);
        props.setMessage("Failed to add product!");
        setTimeout(() => {
          props.setMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageRemove = () => {
    props.setProductImage(null);
  };

  return (
    <div className="add-product-overlay fixed left-[50%] top-[50%] h-screen w-screen -translate-x-[50%] -translate-y-[50%] bg-[#00000090]">
      <div className="add-product-window absolute left-[50%] top-[50%] h-[80%] w-[70%] -translate-x-[50%] -translate-y-[50%] overflow-y-auto rounded-lg border bg-white">
        <div className="top_row flex items-center justify-between border-b px-5 py-3">
          <div className="left text-2xl font-semibold text-blue-500">
            Add New Product
          </div>
          <div className="right">
            <button
              className="rounded-lg bg-rose-500 px-5 py-2 font-semibold text-white hover:bg-rose-600"
              onClick={() => props.handleProductAddPopup()}
            >
              Close
            </button>
          </div>
        </div>
        <div className="add_product p-5">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-10">
              <div className="left col-span-2 grid grid-cols-5 gap-5">
                <div className="col-span-1">
                  <label
                    htmlFor="product_id"
                    className="mb-2 block text-sm font-medium text-gray-600"
                  >
                    Product Id
                  </label>
                  <input
                    type="number"
                    id="product_id"
                    name="product_id"
                    value={props.formData.product_id}
                    onChange={handleChange}
                    className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    required
                    placeholder="Enter code"
                  />
                </div>
                <div className="col-span-4">
                  <label
                    htmlFor="product_name"
                    className="mb-2 block text-sm font-medium text-gray-600"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="product_name"
                    name="product_name"
                    value={props.formData.product_name}
                    onChange={handleChange}
                    className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    required
                    autoFocus
                    placeholder="Enter Product Name"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-600"
                  >
                    Product Category
                  </label>
                  <select
                    type="text"
                    id="category"
                    name="category"
                    value={props.formData.category}
                    onChange={handleChange}
                    className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    required
                  >
                    <option value="" disabled>
                      Select Product Category
                    </option>
                    <option value="arduino">Arduino</option>
                    <option value="raspberry">Raspberry Pi</option>
                    <option value="sensor">Sensors</option>
                    <option value="iot">Internet of Things</option>
                    <option value="motors">Motors</option>
                    <option value="modules">Modules and Driver</option>
                    <option value="boards">Development Boards</option>
                    <option value="learning-kit">Learning Kit</option>
                    <option value="batteries">Batteries and charger</option>
                    <option value="connector">Connectors</option>
                    <option value="tools">Tools and Accessories</option>
                    <option value="display">Display</option>
                    <option value="wires">Wires and Cables</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="tags"
                    className="mb-2 block text-sm font-medium text-gray-600"
                  >
                    Product Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={props.formData.tags}
                    onChange={handleChange}
                    className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    placeholder="type your tags seperated with comma (eg. arduino, sensor, motor)"
                  />
                </div>
                <div className="col-span-5">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-600"
                  >
                    Product Description
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    value={props.formData.description}
                    onChange={handleChange}
                    className="h-[350px] w-full resize-none rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    placeholder="product description here..."
                  />
                </div>
                <div className="action_button col-span-5">
                  <button
                    type="submit"
                    className="mx-auto block rounded-lg bg-green-500 px-8 py-2 font-semibold text-white hover:bg-green-600"
                  >
                    Add Product
                  </button>
                </div>
              </div>
              <div className="right col-span-1">
                <div className="product_image">
                  <h3 className="mb-3 text-lg font-medium text-gray-600">
                    Click below to add image
                  </h3>
                  <label
                    htmlFor="product_image"
                    className="mb-2 block h-[400px] w-[400px] cursor-pointer"
                  >
                    {props.productImage ? (
                      <img
                        src={props.productImage}
                        alt="Product"
                        className="h-full w-full rounded-lg border object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed bg-gray-100 object-cover">
                        <div className="rounded border border-blue-500 px-5 py-2 text-blue-600">
                          Click to add Image
                        </div>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="product_image"
                    id="product_image"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </div>
                {props.productImage && (
                  <div
                    className="mx-auto mt-5 w-max cursor-pointer rounded bg-rose-500 px-5 py-2 text-sm text-white hover:bg-rose-600"
                    onClick={() => handleImageRemove()}
                  >
                    X Remove Image
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewProductPopup;
