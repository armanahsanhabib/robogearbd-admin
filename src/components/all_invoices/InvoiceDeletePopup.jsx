/* eslint-disable react/prop-types */
import InvoicePdfTemplate from "./InvoicePdfTemplate";

const InvoiceDeletePopup = (props) => {
  return (
    <div className="add-product-overlay fixed left-[50%] top-[50%] z-50 h-screen w-screen -translate-x-[50%] -translate-y-[50%] bg-[#00000090]">
      <div className="invoice-details-window absolute left-[50%] top-[50%] h-[90%] -translate-x-[50%] -translate-y-[50%] overflow-hidden rounded-lg border bg-white">
        <div className="top_row flex items-center justify-between border-b px-5 py-3">
          <div className="left text-2xl font-semibold text-rose-500">
            Delete invoice confirmation!
          </div>
          <div className="right">
            <button
              className="rounded-lg bg-rose-500 px-5 py-2 font-semibold text-white hover:bg-rose-600"
              onClick={() => props.handleInvoiceDeletePopup()}
            >
              Close
            </button>
          </div>
        </div>
        <div className="body flex h-[calc(100%-65px)] flex-col items-center overflow-y-auto bg-gray-100 p-5">
          <div id="pdfContainer" className="border">
            <div className="">
              <InvoicePdfTemplate invoiceDetails={props.invoiceDetails} />
            </div>
          </div>
          <div className="buttons mt-5 flex flex-col gap-5">
            <h3 className="text-xl text-rose-600">
              Are you really sure to delete this invoice?
            </h3>
            <div className="buttons flex items-center justify-center gap-5">
              <button
                type="button"
                className="rounded bg-amber-600 px-5 py-2 text-white transition-all hover:bg-amber-700"
                onClick={() => props.handleInvoiceDeletePopup()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded bg-rose-600 px-5 py-2 text-white transition-all hover:bg-rose-700"
                onClick={() => props.handleDeleteInvoice()}
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

export default InvoiceDeletePopup;
