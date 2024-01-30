import { usePDF } from "react-to-pdf";
import InvoicePdfTemplate from "./InvoicePdfTemplate";

const DownloadPdfButton = () => {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  return (
    <div>
      <button onClick={() => toPDF()}>Download PDF</button>
      <InvoicePdfTemplate targetRef={targetRef} />
    </div>
  );
};

export default DownloadPdfButton;
