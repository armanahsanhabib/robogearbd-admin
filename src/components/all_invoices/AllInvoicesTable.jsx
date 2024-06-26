/* eslint-disable react/prop-types */

const AllInvoicesTable = (props) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead className="sticky left-0 top-[-21px] z-50">
        <tr className="bg-gray-300">
          <th className="w-[180px] border-b border-r p-2">Date</th>
          <th className="w-[180px] border-b border-r p-2">Invoice No</th>
          <th className="border-b border-r p-2">Customer Name</th>
          <th className="w-[200px] border-b border-r p-2">Phone</th>
          <th className="w-[130px] border-b border-r p-2">Subtotal</th>
          <th className="w-[130px] border-b border-r p-2">Discount</th>
          <th className="w-[130px] border-b border-r p-2">Paid</th>
          <th className="w-[130px] border-b border-r p-2">Delivery</th>
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
              {new Date(item.date).toLocaleDateString("en-GB")}
            </td>
            <td className="border-b border-r p-2 text-center">
              {item.receiptNo}
            </td>
            <td className="border-b border-r p-2 text-center">
              {item.customerInfo.customer_name}
            </td>
            <td className="border-b border-r p-2 text-center">
              {item.customerInfo.customer_phone}
            </td>
            <td className="border-b border-r p-2 text-center">
              {Number(item.billCalculation.subTotal)?.toFixed(2)}
            </td>
            <td className="border-b border-r p-2 text-center">
              {Number(item.billCalculation.discount)?.toFixed(2)}
            </td>
            <td className="border-b border-r p-2 text-center">
              {Number(item.billCalculation.totalPayable)?.toFixed(2)}
            </td>
            <td className="border-b border-r p-2 text-center">
              {item.billCalculation.delivery}
            </td>
            <td className="border-b p-3 text-center">
              <div className="buttons flex justify-center gap-3">
                <button
                  className="rounded bg-sky-500 px-3 py-1 text-white transition-all hover:bg-sky-700"
                  onClick={() => props.handleInvoicePopup(item.receiptNo)}
                >
                  View
                </button>
                <button
                  className="rounded bg-red-500 px-2 py-1 text-white transition-all hover:bg-red-700"
                  onClick={() => props.handleInvoiceDeletePopup(item.receiptNo)}
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

export default AllInvoicesTable;
