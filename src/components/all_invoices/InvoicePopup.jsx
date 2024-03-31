/* eslint-disable react/prop-types */
import { useRef } from "react";
import { usePDF } from "react-to-pdf";
import { useReactToPrint } from "react-to-print";
import InvoicePdfTemplate from "./InvoicePdfTemplate";

const InvoicePopup = (props) => {
  const componentRef = useRef();
  const { toPDF, targetRef } = usePDF({
    filename: `${props.invoiceDetails.receiptNo}_${props.invoiceDetails.customerInfo.customer_name}_${props.invoiceDetails.customerInfo.customer_phone}`,
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="add-product-overlay fixed left-[50%] top-[50%] z-50 h-screen w-screen -translate-x-[50%] -translate-y-[50%] bg-[#00000090]">
      <div className="invoice-details-window absolute left-[50%] top-[50%] h-[90%] -translate-x-[50%] -translate-y-[50%] overflow-hidden rounded-lg border bg-white">
        <div className="top_row flex items-center justify-between border-b px-5 py-3">
          <div className="left text-2xl font-semibold text-blue-500">
            Invoice Details
          </div>
          <div className="right">
            <button
              className="rounded-lg bg-rose-500 px-5 py-2 font-semibold text-white hover:bg-rose-600"
              onClick={() => props.handleInvoicePopup()}
            >
              Close
            </button>
          </div>
        </div>
        <div className="body flex h-[calc(100%-65px)] flex-col items-center overflow-y-auto bg-gray-100 p-5">
          <div id="pdfContainer" className="border">
            <div className="" ref={targetRef}>
              <InvoicePdfTemplate
                invoiceDetails={props.invoiceDetails}
                ref={componentRef}
              />
            </div>
          </div>
          <div className="buttons mt-5 flex gap-5">
            <button
              type="button"
              className="rounded bg-emerald-500 px-5 py-2 text-white transition-all hover:bg-emerald-700"
              onClick={handlePrint}
            >
              Print Invoice
            </button>
            <button
              type="button"
              className="rounded bg-indigo-500 px-5 py-2 text-white transition-all hover:bg-indigo-700"
              onClick={() => toPDF()}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePopup;
