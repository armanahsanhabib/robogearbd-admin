/* eslint-disable react/prop-types */
const StockOutTable = (props) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-300">
          <th className="w-[130px] border-b border-r p-2">Date</th>
          <th className="w-[130px] border-b border-r p-2">
            Invoice <br /> No
          </th>
          <th className="w-[100px] border-b border-r p-2">
            Product <br /> ID
          </th>
          <th className="w-[100px] border-b border-r p-2">Image</th>
          <th className="border-b border-r p-2">Name</th>
          <th className="w-[120px] border-b border-r p-2">
            Buying <br /> price
          </th>
          <th className="w-[120px] border-b border-r p-2">
            Selling <br /> price
          </th>
          <th className="w-[100px] border-b border-r p-2">Qty</th>
          <th className="w-[200px] border-b p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr
            key={index}
            className={`transition-all ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <td className="border-b border-r p-2 text-center">
              {new Date(item.date).toLocaleDateString("en-GB")}
            </td>
            <td className="border-b border-r p-2 text-center">
              {item.invoiceNo}
            </td>
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
              {Number(item.buying_price)?.toFixed(2)}
            </td>
            <td className="border-b border-r p-2 text-center">
              {Number(item.selling_price)?.toFixed(2)}
            </td>
            <td className="border-b border-r p-2 text-center">{item.qty}</td>
            <td className="border-b p-3 text-center">
              <button className="mr-3 cursor-not-allowed rounded bg-amber-500 px-2 py-1 text-white transition-all hover:bg-amber-700">
                Edit
              </button>
              <button
                className="cursor-not-allowed rounded bg-red-500 px-2 py-1 text-white transition-all hover:bg-red-700"
                // onClick={() => props.handleDelete(item._id)}
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

export default StockOutTable;
