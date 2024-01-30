import { useEffect, useState } from "react";
import { BsCart4, BsCashCoin, BsGraphUpArrow } from "react-icons/bs";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdOutlinePaid } from "react-icons/md";
import { PiHandCoinsDuotone } from "react-icons/pi";
import { RiRefund2Line } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import AhsanImg from "../assets/ahsan.jpg";
import JahidImg from "../assets/jahid.jpg";
import PlaceholderImg from "../assets/placeholder.jpg";
import SagorImg from "../assets/sagor.jpg";
import ShareholderCard from "../components/admin_dashboard/ShareholderCard";
import StatsCard from "../components/admin_dashboard/StatsCard";

const AdminDashboard = () => {
  const [totalStockIn, setTotalStockIn] = useState(0);
  const [totalSells, setTotalSells] = useState(0);
  const [currentStockValue, setCurrentStockValue] = useState(0);

  const businessStats = [
    {
      icon: <BsGraphUpArrow />,
      txtColor: "text-purple-600",
      iconBg: "bg-purple-100",
      text: "Total Stock In",
      value: totalStockIn?.toFixed(2),
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
      const response = await fetch(
        // "https://robogear-bd-97bac4d16518.herokuapp.com/products/all-stock-in-products",
        "http://localhost:3000/products/all-stock-in-products",
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      const totalStockIn = result.reduce((total, product) => {
        if (product.buying_price && product.qty) {
          const productTotalPrice = product.buying_price * product.qty;
          return total + productTotalPrice;
        }
        return total;
      }, 0);

      setTotalStockIn(totalStockIn);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // get all sells from invoices database
  const fetchTotalSells = async () => {
    try {
      const response = await fetch(
        // "https://robogear-bd-97bac4d16518.herokuapp.com/products/all-invoices",
        "http://localhost:3000/products/all-invoices",
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const invoices = await response.json();

      const totalSells = invoices.reduce((total, invoice) => {
        if (invoice.billCalculation && invoice.billCalculation.totalPayable) {
          return total + parseFloat(invoice.billCalculation.totalPayable);
        }
        return total;
      }, 0);

      setTotalSells(totalSells);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // get all stock in data from database
  const fetchCurrentStockValue = async () => {
    try {
      const response = await fetch(
        // "https://robogear-bd-97bac4d16518.herokuapp.com/products/all-products",
        "http://localhost:3000/products/all-products",
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

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
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchTotalStockIn();
    fetchTotalSells();
    fetchCurrentStockValue();
  }, []);

  return (
    <div className="relative h-[calc(100vh-81px)] overflow-y-auto p-5">
      <div className="mb-3 flex items-center justify-between border bg-slate-100 p-3">
        <h3 className="text-3xl font-semibold text-rose-600">
          Admin Dashboard
        </h3>
        {/* <button
          className="flex items-center gap-2 rounded bg-green-500 px-5 py-2 text-white hover:bg-green-600"
          onClick={() => {
            handleProductAddPopup();
          }}
        >
          <IoMdAdd className="text-xl" /> Add new Product
        </button> */}
      </div>
      <h2 className="mb-5 text-xl font-semibold text-blue-600">
        Business Statistics
      </h2>
      <div className="cards_container grid-cols-4 gap-8 xl:grid">
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
      <h2 className="my-5 text-xl font-semibold text-blue-600">
        Shareholder Data
      </h2>
      <div className="cards_container grid-cols-4 gap-8 xl:grid">
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
  );
};

export default AdminDashboard;
