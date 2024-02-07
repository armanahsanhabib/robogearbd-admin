/* eslint-disable react/prop-types */

const ProductsTable = (props) => {
  return (
    <table className="relative w-full border-collapse border border-gray-300">
      <thead className="sticky left-0 top-[-21px] z-10">
        <tr className="bg-gray-300">
          <th className="w-[100px] border-b border-r p-2">ID</th>
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
        {props.data.map((item, index) => (
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
                src={`https://robogear-bd-97bac4d16518.herokuapp.com/product_images/${item.product_image}`}
                alt={item.product_image}
                className="mx-auto"
                style={{ width: "auto", height: "50px" }}
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
              <button className="mr-3 rounded bg-amber-500 px-2 py-1 text-white transition-all hover:bg-amber-700">
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
