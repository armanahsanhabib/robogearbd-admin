/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { BsCart4, BsCashCoin } from "react-icons/bs";
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaMoneyBillTrendUp,
} from "react-icons/fa6";
import { MdOutlinePaid } from "react-icons/md";
import { PiHandCoinsDuotone } from "react-icons/pi";
import { RiRefund2Line } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import AhsanImg from "../assets/ahsan.jpg";
import JahidImg from "../assets/jahid.jpg";
import PlaceholderImg from "../assets/placeholder.jpg";
import SagorImg from "../assets/sagor.jpg";
import Header from "../components/Header";
import ShareholderCard from "../components/admin_dashboard/ShareholderCard";
import StatsCard from "../components/admin_dashboard/StatsCard";

const AdminDashboard = (props) => {
  const [totalStockIn, setTotalStockIn] = useState(0);
  const [totalStockOut, setTotalStockOut] = useState(0);
  const [totalSells, setTotalSells] = useState(0);
  const [currentStockValue, setCurrentStockValue] = useState(0);
  const [note, setNote] = useState(props.userData.note);

  const handleNoteChange = async (e) => {
    const newNote = e.target.value;
    setNote(newNote);

    try {
      // Send an HTTP PUT request to update the note value in the backend
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URI}/user/update-note/${
          props.userData._id
        }`,
        { note: newNote },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  const businessStats = [
    {
      icon: <FaArrowTrendDown />,
      txtColor: "text-purple-600",
      iconBg: "bg-purple-100",
      text: "Total Stock In",
      value: totalStockIn?.toFixed(2),
    },
    {
      icon: <FaArrowTrendUp />,
      txtColor: "text-teal-600",
      iconBg: "bg-teal-100",
      text: "Total Stock Out",
      value: totalStockOut?.toFixed(2),
    },
    {
      icon: <BsCart4 />,
      txtColor: "text-green-600",
      iconBg: "bg-green-100",
      text: "Total Sells",
      value: totalSells?.toFixed(2),
    },
    {
      icon: <BsCashCoin />,
      txtColor: "text-blue-600",
      iconBg: "bg-blue-100",
      text: "Current Stock Value",
      value: currentStockValue?.toFixed(2),
    },
    {
      icon: <PiHandCoinsDuotone />,
      txtColor: "text-amber-600",
      iconBg: "bg-amber-100",
      text: "Total Profit",
      value: (currentStockValue + totalSells - totalStockIn)?.toFixed(2),
    },
    {
      icon: <RiRefund2Line />,
      txtColor: "text-lime-600",
      iconBg: "bg-lime-100",
      text: "Total Cash Fund",
      value: 0?.toFixed(2),
    },
    {
      icon: <TbReportMoney />,
      txtColor: "text-rose-600",
      iconBg: "bg-rose-100",
      text: "Total Debt",
      value: 0?.toFixed(2),
    },
    {
      icon: <MdOutlinePaid />,
      txtColor: "text-fuchsia-600",
      iconBg: "bg-fuchsia-100",
      text: "Extra Expenses",
      value: 0?.toFixed(2),
    },
    {
      icon: <FaMoneyBillTrendUp />,
      txtColor: "text-cyan-600",
      iconBg: "bg-cyan-100",
      text: "Current Valuation",
      value: 0?.toFixed(2),
    },
  ];

  const shareHolderStats = [
    {
      img: AhsanImg,
      name: "Ahsan Habib",
      sharePercentage: 30,
      totalInvest: 10000,
      currentShare: (30 / 100) * totalStockIn,
      ringColor: "ring-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      img: SagorImg,
      name: "Sagor Sharif",
      sharePercentage: 30,
      totalInvest: 10000,
      currentShare: (30 / 100) * totalStockIn,
      ringColor: "ring-green-500",
      bgColor: "bg-green-50",
    },
    {
      img: JahidImg,
      name: "Jahid Akon",
      sharePercentage: 20,
      totalInvest: 7235,
      currentShare: (20 / 100) * totalStockIn,
      ringColor: "ring-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      img: PlaceholderImg,
      name: "Moon",
      sharePercentage: 20,
      totalInvest: 7235,
      currentShare: (20 / 100) * totalStockIn,
      ringColor: "ring-amber-500",
      bgColor: "bg-amber-50",
    },
  ];

  // get all stock in data from database
  const fetchTotalStockIn = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/product/all-stock-in-products`,
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const result = response.data;

      const totalStockInValue = result.reduce((total, product) => {
        if (product.buying_price && product.qty) {
          const productTotalPrice = product.buying_price * product.qty;
          return total + productTotalPrice;
        }
        return total;
      }, 0);

      setTotalStockIn(totalStockInValue);
    } catch (error) {
      console.error("Error fetching stock in data:", error.message);
    }
  };

  // get all stock out data from database
  const fetchTotalStockOut = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/product/all-stock-out-products`,
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const result = response.data;

      const totalStockOutValue = result.reduce((total, product) => {
        if (product.buying_price && product.qty) {
          const productTotalPrice = product.buying_price * product.qty;
          return total + productTotalPrice;
        }
        return total;
      }, 0);

      setTotalStockOut(totalStockOutValue);
    } catch (error) {
      console.error("Error fetching stock out data:", error.message);
    }
  };

  // get all sells from invoices database
  const fetchTotalSells = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/order/all-invoices`,
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const invoices = response.data;

      const totalSellsValue = invoices.reduce((total, invoice) => {
        if (invoice.billCalculation && invoice.billCalculation.totalPayable) {
          return total + parseFloat(invoice.billCalculation.totalPayable);
        }
        return total;
      }, 0);

      setTotalSells(totalSellsValue);
    } catch (error) {
      console.error("Error fetching sells data:", error.message);
    }
  };

  // get current stock value from database
  const fetchCurrentStockValue = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/product/all-products`,
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const result = response.data;

      const currentStockValue = result.reduce((total, product) => {
        if (product.buying_price && product.current_stock) {
          const productTotalPrice =
            product.buying_price * product.current_stock;
          return total + productTotalPrice;
        }
        return total;
      }, 0);

      setCurrentStockValue(currentStockValue);
    } catch (error) {
      console.error("Error fetching current stock data:", error.message);
    }
  };

  useEffect(() => {
    fetchTotalStockIn();
    fetchTotalStockOut();
    fetchTotalSells();
    fetchCurrentStockValue();
  }, []);

  return (
    <div className="relative m-5 w-[calc(100%-300px)] overflow-hidden rounded-lg border bg-white p-3">
      <Header title="Admin Dashboard" />
      <main className="grid h-full grid-cols-4">
        <div className="left_container col-span-3 h-[calc(100%-65px)] overflow-auto border-r p-3">
          <div className="stats mb-5">
            <h2 className="mb-5 text-xl font-semibold text-blue-600">
              Business Statistics
            </h2>
            <div className="cards_container grid-cols-3 gap-8 xl:grid">
              {businessStats.map((data, index) => (
                <StatsCard
                  key={index}
                  icon={data.icon}
                  txtColor={data.txtColor}
                  iconBg={data.iconBg}
                  text={data.text}
                  value={data.value}
                />
              ))}
            </div>
          </div>
          <div className="notes grid grid-cols-1 gap-5">
            <div className="notes_item">
              <h2 className="text-lg font-semibold text-blue-600">Notepad</h2>
              <textarea
                name="notepad"
                id="notepad"
                placeholder="Enter your notes here"
                value={note}
                onChange={handleNoteChange}
                className="outline:none mt-2 h-[300px] w-full resize-y rounded-lg border p-3 font-[300] focus:border-blue-600 focus:outline-none"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="shareholder_item h-[calc(100%-65px)] overflow-auto p-3">
          <h2 className="mb-5 text-xl font-semibold text-blue-600">
            Shareholder Data
          </h2>
          <div className="cards_container grid-cols-1 gap-8 xl:grid">
            {shareHolderStats.map((data, index) => (
              <ShareholderCard
                key={index}
                name={data.name}
                img={data.img}
                totalInvest={data.totalInvest}
                currentShare={data.currentShare}
                sharePercentage={data.sharePercentage}
                ringColor={data.ringColor}
                bgColor={data.bgColor}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
