/* eslint-disable react/prop-types */
const DeletePopup = (props) => {
  const product = props.data.find((item) => item._id === props._id);

  return (
    <div className="add-product-overlay fixed left-[50%] top-[50%] z-50 h-screen w-screen -translate-x-[50%] -translate-y-[50%] bg-[#00000090]">
      <div className="invoice-details-window absolute left-[50%] top-[50%] w-[90%] max-w-[800px] -translate-x-[50%] -translate-y-[50%] overflow-hidden rounded-lg border bg-white">
        <div className="top_row flex items-center justify-between border-b px-5 py-3">
          <div className="left text-2xl font-semibold text-rose-500">
            Product Delete Confirmation!
          </div>
          <div className="right">
            <button
              className="rounded-lg bg-rose-500 px-5 py-2 font-semibold text-white hover:bg-rose-600"
              onClick={() => props.handleDeletePopupClick(false)}
            >
              Close
            </button>
          </div>
        </div>
        <div className="body flex flex-col items-center gap-5 overflow-y-auto bg-gray-100 p-5">
          <div className="flex flex-col items-center gap-3">
            <div className="top">
              <img
                src={`${import.meta.env.VITE_SERVER_URI}/product_images/${
                  product.product_image
                }`}
                alt={product.product_name}
                className="h-[200px] rounded border"
              />
            </div>
            <div className="bottom text-center">
              <h3 className="text-xl text-blue-600">{product.product_name}</h3>
              <p className="text-gray-700">
                Buying Price: {product.buying_price}; Selling Price:{" "}
                {product.selling_price}
              </p>
              <p className="text-gray-700">
                Stock in: {product.stock_in}; Stock out: {product.stock_out};
                Current stock: {product.current_stock}
              </p>
            </div>
          </div>
          <div className="buttons flex w-full flex-col gap-5 border-t py-3">
            <h3 className="text-center text-xl text-rose-600">
              Are you really sure to delete this product?
            </h3>
            <div className="buttons flex items-center justify-center gap-5">
              <button
                type="button"
                className="rounded bg-amber-600 px-5 py-2 text-white transition-all hover:bg-amber-700"
                onClick={() => props.handleDeletePopupClick(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded bg-rose-600 px-5 py-2 text-white transition-all hover:bg-rose-700"
                onClick={() => props.handleDelete(props._id)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
