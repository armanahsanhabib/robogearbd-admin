/* eslint-disable react/prop-types */
const CustomerDetailsForm = (props) => {
  return (
    <form className="flex flex-col gap-3 border p-5 text-sm">
      <h2 className="text-lg font-semibold text-blue-600">
        Add Customer Details
      </h2>
      <div className="flex items-center gap-3">
        <label htmlFor="customer_name" className="w-[150px]">
          Customer Name:
        </label>
        <input
          type="text"
          name="customer_name"
          id="customer_name"
          value={props.customerInfo.customer_name}
          onChange={props.handleCustomerFormChange}
          className="w-full rounded-md border px-2 py-1 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-3">
        <label htmlFor="customer_phone" className="w-[150px]">
          Mobile No:
        </label>
        <input
          type="text"
          name="customer_phone"
          id="customer_phone"
          value={props.customerInfo.customer_phone}
          onChange={props.handleCustomerFormChange}
          className="w-full rounded-md border px-2 py-1 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-3">
        <label htmlFor="customer_address" className="w-[150px]">
          Address:
        </label>
        <input
          type="text"
          name="customer_address"
          id="customer_address"
          value={props.customerInfo.customer_address}
          onChange={props.handleCustomerFormChange}
          className="w-full rounded-md border px-2 py-1 focus:border-blue-500 focus:outline-none"
        />
      </div>
    </form>
  );
};

export default CustomerDetailsForm;
