/* eslint-disable react/prop-types */
// import ProductPlaceholder from "../../assets/product-placeholder.png";
import { useState } from "react";
import { FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";

const ProductsTable = (props) => {
  const [sortId, setSortId] = useState(true);

  const sortedData = sortId ? props.data.slice().reverse() : props.data.slice();

  return (
    <table className="relative w-full border-collapse border border-gray-300">
      <thead className="sticky left-0 top-[-21px] z-10">
        <tr className="bg-gray-300">
          <th className="w-[100px] border-b border-r p-2">
            <span
              onClick={() => setSortId(!sortId)}
              className="flex items-center justify-center gap-2"
            >
              ID{" "}
              {!sortId ? (
                <FaSortNumericDown className="cursor-pointer text-xl text-blue-500" />
              ) : (
                <FaSortNumericUp className="cursor-pointer text-xl text-blue-500" />
              )}
            </span>
          </th>
          <th className="w-[120px] border-b border-r p-2">Image</th>
          <th className="border-b border-r p-2">Name</th>
          <th className="w-[150px] border-b border-r p-2">
            Buying <br />
            Price
          </th>
          <th className="w-[150px] border-b border-r p-2">
            Selling <br />
            Price
          </th>
          <th className="w-[100px] border-b border-r p-2">
            Stock <br />
            in
          </th>
          <th className="w-[100px] border-b border-r p-2">
            Stock <br />
            out
          </th>
          <th className="w-[100px] border-b border-r p-2">
            Current <br />
            Stock
          </th>
          <th className="w-[200px] border-b p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr
            key={item._id}
            className={`transition-all ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <td className="border-b border-r p-2 text-center">
              {item.product_id}
            </td>
            <td className="border-b border-r p-2">
              <img
                src={`${import.meta.env.VITE_SERVER_URI}/product_images/${
                  item.product_image
                }`}
                alt={item.product_id}
                className="mx-auto"
                style={{ width: "auto", height: "50px" }}
                onError={(e) => {
                  e.target.src = "https://placehold.co/250";
                  e.target.alt = "Placeholder Image";
                }}
              />
            </td>
            <td className="border-b border-r p-2">{item.product_name}</td>
            <td className="border-b border-r p-2 text-center">
              {item.buying_price?.toFixed(2)}
            </td>
            <td className="border-b border-r p-2 text-center">
              {item.selling_price?.toFixed(2)}
            </td>
            <td className="border-b border-r p-2 text-center">
              {item.stock_in}
            </td>
            <td className="border-b border-r p-2 text-center">
              {item.stock_out}
            </td>
            <td className="border-b border-r p-2 text-center">
              {item.current_stock}
            </td>
            <td className="border-b p-3 text-center">
              <button
                className="mr-3 rounded bg-amber-500 px-2 py-1 text-white transition-all hover:bg-amber-700"
                onClick={() => props.handleUpdatePopupClick(item.product_id)}
              >
                Edit
              </button>
              <button
                className="rounded bg-red-500 px-2 py-1 text-white transition-all hover:bg-red-700"
                onClick={() => props.handleDeletePopupClick(item._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
