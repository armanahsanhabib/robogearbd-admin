/* eslint-disable react/prop-types */
import { FaSave } from "react-icons/fa";

const SavePdfForm = (props) => {
  return (
    <div className="action_buttons grid grid-cols-5 gap-5 border p-5 text-sm">
      <div className="col-span-3 flex items-center gap-3">
        <label htmlFor="delivery" className="w-[100px]">
          Delivery:
        </label>
        <select
          type="text"
          name="delivery"
          id="delivery"
          value={props.billCalculation.delivery}
          onChange={props.handleBillChange}
          className="w-full rounded-md border px-2 py-1 focus:border-blue-500 focus:outline-none"
        >
          <option value="" disabled>
            Select Delivery
          </option>
          <option value="sagor">Sagor Sharif</option>
          <option value="ahsan">Ahsan Habib</option>
        </select>
      </div>
      <div className="col-span-2 flex items-center gap-3">
        <label htmlFor="discount" className="w-[100px]">
          Discount:
        </label>
        <input
          type="number"
          name="discount"
          id="discount"
          value={props.billCalculation.discount}
          onChange={props.handleBillChange}
          className="w-full rounded-md border px-2 py-1 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="action_buttons col-span-5 flex items-center justify-center">
        {/* <ReactToPrint
          trigger={() => {
            return (
              <button className="flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2 text-white hover:bg-indigo-600">
                <ImPrinter className="text-lg" />
                <span>Print Invoice</span>
              </button>
            );
          }}
          content={() => props.componentRef.current}
          documentTitle="Receipt"
        /> */}
        <button
          className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2 text-white hover:bg-emerald-600"
          onClick={() => props.saveInvoice()}
        >
          <FaSave className="text-lg" />
          <span>Confirm and Save</span>
        </button>
      </div>
    </div>
  );
};

export default SavePdfForm;
