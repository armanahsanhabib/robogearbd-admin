/* eslint-disable react/prop-types */
import { FaUndo } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const AddProductItemForm = (props) => {
  return (
    <form
      className="flex flex-col gap-3 border p-5 text-sm"
      onSubmit={props.handleAddItemClick}
    >
      <h2 className="text-lg font-semibold text-blue-600">
        Add Product to Invoice
      </h2>
      <div className="flex items-center gap-3">
        <label htmlFor="product_id" className="w-[150px]">
          Product ID:
        </label>
        <input
          type="number"
          name="product_id"
          id="product_id"
          onChange={props.handleInvoiceItemFormChange}
          value={props.invoiceItem.product_id}
          className="w-full rounded-md border px-2 py-1 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="relative flex items-center gap-3">
        <label htmlFor="product_name" className="w-[150px]">
          Product Name:
        </label>
        <input
          type="text"
          name="product_name"
          id="product_name"
          onChange={props.handleInvoiceItemFormChange}
          value={props.invoiceItem.product_name}
          className="w-full rounded-md border px-2 py-1 focus:border-blue-500 focus:outline-none"
        />
        {props.suggestions.length > 0 && (
          <ul className="suggestion-list absolute left-0 top-[40px] max-h-[300px] w-full overflow-y-auto rounded border bg-gray-50 shadow">
            {props.suggestions.map((product) => (
              <li
                className="cursor-pointer border-b px-3 py-2 hover:bg-gray-100"
                key={product._id}
                onClick={() => props.handleSelectProduct(product)}
              >
                {product.product_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="left flex items-center gap-3">
          <label htmlFor="buying_price" className="">
            Cost:
          </label>
          <input
            type="number"
            name="buying_price"
            id="buying_price"
            onChange={props.handleInvoiceItemFormChange}
            value={props.invoiceItem.buying_price}
            className="w-full rounded-md border px-2 py-1 focus:border-rose-500 focus:outline-none"
            readOnly
          />
        </div>
        <div className="right flex items-center gap-3">
          <label htmlFor="selling_price" className="">
            Price:
          </label>
          <input
            type="number"
            name="selling_price"
            id="selling_price"
            onChange={props.handleInvoiceItemFormChange}
            value={props.invoiceItem.selling_price}
            className="w-full rounded-md border px-2 py-1 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="right flex items-center gap-3">
          <label htmlFor="qty" className="">
            Qty:
          </label>
          <input
            type="number"
            name="qty"
            id="qty"
            onChange={props.handleInvoiceItemFormChange}
            value={props.invoiceItem.qty}
            className="w-full rounded-md border px-2 py-1 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <button
          type="button"
          className="mt-3 flex items-center gap-2 rounded-lg bg-rose-500 px-5 py-2 text-white hover:bg-rose-600"
          onClick={() => props.undoLastItem()}
        >
          <FaUndo /> <span>Undo Item</span>
        </button>
        <button
          type="submit"
          className="mt-3 flex items-center gap-2 rounded-lg bg-blue-500 px-8 py-2 text-white hover:bg-blue-600"
        >
          <span>Add Item</span> <FaArrowRightLong />
        </button>
      </div>
    </form>
  );
};

export default AddProductItemForm;
