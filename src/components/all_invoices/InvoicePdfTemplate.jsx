/* eslint-disable react/prop-types */
import { FaFacebookSquare, FaGlobe } from "react-icons/fa";
import LOGO from "../../assets/robogear logo.png";
import LOGO_TEXT from "../../assets/robogear text logo.png";

const InvoicePdfTemplate = (props) => {
  const date = new Date();

  return (
    <div
      id="invoice-pdf"
      ref={props.targetRef}
      className="print_area right flex w-[210mm] flex-col gap-3 border px-[50px] py-[60px]"
    >
      {/* Invoice Header */}
      <div className="invoice_header flex gap-14">
        <div className="left_logo text-[12px] font-[300] text-gray-800">
          <img src={LOGO} alt="logo" className="mb-1 h-[45px]" />
          <p className="flex items-center gap-2">
            <FaGlobe /> www.robogear.com
          </p>
          <p className="flex items-center gap-2">
            <FaFacebookSquare /> RoboGearBDShop
          </p>
        </div>
        <div className="center_logo text-[12px] font-[300] text-gray-500">
          <img src={LOGO_TEXT} alt="text logo" className="mb-2 w-[350px]" />
          <p>Kobi Najrul Islam Sarak, C&B Road, Barishal.</p>
          <p>Contact: +880 1518-953348, +880 1704-428814</p>
          <p>E-mail: robogearbd.shop@gmail.com</p>
        </div>
      </div>
      {/* Invoice Customer Details Section */}
      <div className="customer_details mb-2">
        <h2 className="mb-2 text-sm font-[500] text-blue-600">
          Customer details
        </h2>
        <table className="flex justify-between gap-5 text-[12px] font-[300] text-gray-800">
          <tbody className="left">
            <tr>
              <th className="w-[100px] border border-gray-400 px-2 py-1 text-left font-[600]">
                Name:
              </th>
              <td className="w-[320px] border border-gray-400 px-2 py-1">
                {props.customerInfo.customer_name}
              </td>
            </tr>
            <tr>
              <th className="w-[100px] border border-gray-400 px-2 py-1 text-left font-[600]">
                Mobile:
              </th>
              <td className="w-[320px] border border-gray-400 px-2">
                {props.customerInfo.customer_phone}
              </td>
            </tr>
            <tr>
              <th className="w-[100px] border border-gray-400 px-2 py-1 text-left font-[600]">
                Address:
              </th>
              <td className="w-[320px] border border-gray-400 px-2 py-1">
                {props.customerInfo.customer_address}
              </td>
            </tr>
          </tbody>
          <tbody className="right">
            <tr className="">
              <th className="border border-gray-400 px-2 py-1 text-right font-[600]">
                Receipt No:
              </th>
              <td className="w-[130px] border border-gray-400 px-2 py-1 text-right">
                {props.receiptNo}
              </td>
            </tr>
            <tr className="">
              <th className="border border-gray-400 px-2 py-1 text-right font-[600]">
                Date:
              </th>
              <td className="w-[130px] border border-gray-400 px-2 py-1 text-right">{`${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`}</td>
            </tr>
            <tr className="">
              <th className="border border-gray-400 px-2 py-1 text-right font-[600]">
                Time:
              </th>
              <td className="w-[130px] border border-gray-400 px-2 py-1 text-right">
                {date.toLocaleTimeString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Invoice Order Details */}
      <div className="order_details">
        <h2 className="mb-2 text-sm font-[500] text-blue-600">Order details</h2>
        <table className="w-full border-collapse text-[12px] font-[300] text-gray-800">
          <tbody>
            <tr className="mx-3 border-y-2 border-gray-400">
              <th className="w-[50px] border border-gray-400 py-1 font-[600]">
                SL
              </th>
              <th className="w-[100px] border border-gray-400 py-1 font-[600]">
                Product ID
              </th>
              <th className="border border-gray-400 px-1 py-1 font-[600]">
                Product Name
              </th>
              <th className="w-[80px] border border-gray-400 py-1 text-center font-[600]">
                Price
              </th>
              <th className="w-[50px] border border-gray-400 py-1 text-center font-[600]">
                Qty
              </th>
              <th className="w-[80px] border border-gray-400 py-1 text-center font-[600]">
                TK
              </th>
            </tr>
            {props.invoiceProducts.map((item, index) => (
              <tr
                // className={`border-b ${
                //   index % 2 === 0 ? "even:bg-white" : "odd:bg-slate-50"
                // }`}
                key={index}
              >
                <td className="border border-gray-400 py-1 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-400 py-1 text-center">{`RGBD-${item.product_id}`}</td>
                <td className="border border-gray-400 p-1">
                  {item.product_name}
                </td>
                <td className="border border-gray-400 py-1 text-center">
                  {Number(item.selling_price).toFixed(2)}
                </td>
                <td className="border border-gray-400 py-1 text-center">
                  {item.qty}
                </td>
                <td className="border border-gray-400 py-1 text-center">
                  {Number(item.selling_price * item.qty).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="text-[12px]">
              <td
                className="pr-8 text-[10px] font-[300] text-gray-600"
                colSpan={3}
                rowSpan={3}
              >
                NB: We kindly request you to carefully inspect the products
                before delivery. No complaints, claims, or returns can be
                accepted afterward. Thank you for choosing RoboGearBD for your
                robotics journey.
              </td>
              <th
                className="border-b-2 border-gray-400 px-2 text-right font-[600]"
                colSpan={2}
              >
                Sub Total =
              </th>
              <td className="border-b-2 border-gray-400 px-2 text-right">
                {props.billCalculation.subTotal.toFixed(2)}
              </td>
            </tr>
            <tr className="text-[12px]">
              {/* <td className="px-2 py-1" colSpan={3}></td> */}
              <th
                className="border-b-2 border-gray-400 px-2 text-right font-[600]"
                colSpan={2}
              >
                Discount =
              </th>
              <td className="border-b-2 border-gray-400 px-2 text-right">
                {Number(props.billCalculation.discount).toFixed(2)}
              </td>
            </tr>
            <tr className="text-[12px]">
              {/* <td className="px-2 py-1" colSpan={3}></td> */}
              <th
                className="border-b-2 border-gray-400 px-2 text-right font-[600]"
                colSpan={2}
              >
                Total Payable =
              </th>
              <td className="border-b-2 border-gray-400 px-2 text-right">
                {props.billCalculation.totalPayable.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicePdfTemplate;
