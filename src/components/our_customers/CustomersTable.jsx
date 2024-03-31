/* eslint-disable react/prop-types */

const CustomersTable = (props) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead className="sticky left-0 top-[-21px] z-50">
        <tr className="bg-gray-300">
          <th className="w-[100px] border-b border-r p-2">Sl</th>
          <th className="border-b border-r p-2">Customer Name</th>
          <th className="border-b border-r p-2">Phone</th>
          <th className="border-b border-r p-2">Email</th>
          <th className="w-[350px] border-b border-r p-2">Address</th>
          <th className="border-b border-r p-2">Total Order</th>
          <th className="border-b border-r p-2">
            Pending <br /> Order
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
            <td className="border-b border-r p-2 text-center">{index + 1}</td>
            <td className="border-b border-r p-2 text-center">
              {item.fullName}
            </td>
            <td className="border-b border-r p-2 text-center">{item.phone}</td>
            <td className="border-b border-r p-2 text-center">{item.email}</td>
            <td className="border-b border-r p-2 text-center">
              {item.address}
            </td>
            <td className="border-b border-r p-2 text-center">
              {/* {Number(item.totalOrder)?.toFixed(2)} */}
            </td>
            <td className="border-b border-r p-2 text-center">
              {/* {item.pendingOrder} */}
            </td>
            <td className="border-b p-3 text-center">
              <div className="buttons flex justify-center gap-3">
                <button
                  className="rounded bg-sky-500 px-3 py-1 text-white transition-all hover:bg-sky-700"
                  // onClick={() => props.handleInvoicePopup(item.receiptNo)}
                >
                  Edit
                </button>
                <button
                  className="rounded bg-red-500 px-2 py-1 text-white transition-all hover:bg-red-700"
                  // onClick={() => props.handleInvoiceDeletePopup(item.receiptNo)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomersTable;
