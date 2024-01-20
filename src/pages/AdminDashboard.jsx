import { useEffect, useState } from "react";
import { BsCart4, BsCashCoin, BsGraphUpArrow } from "react-icons/bs";
import { PiHandCoinsDuotone } from "react-icons/pi";
import AhsanImg from "../assets/ahsan.jpg";
import JahidImg from "../assets/jahid.jpg";
import PlaceholderImg from "../assets/placeholder.jpg";
import SagorImg from "../assets/sagor.jpg";
import ShareholderCard from "../components/admin_dashboard/ShareholderCard";
import StatsCard from "../components/admin_dashboard/StatsCard";

const AdminDashboard = () => {
  const [totalStockPrice, setTotalStockPrice] = useState(0);
  const businessStats = [
    {
      icon: <BsGraphUpArrow />,
      txtColor: "text-purple-600",
      iconBg: "bg-purple-100",
      text: "Total Stock Product",
      value: totalStockPrice.toFixed(2),
    },
    {
      icon: <BsCashCoin />,
      txtColor: "text-green-600",
      iconBg: "bg-green-100",
      text: "Total Cash Fund",
      value: "3152.00",
    },
    {
      icon: <BsCart4 />,
      txtColor: "text-blue-600",
      iconBg: "bg-blue-100",
      text: "Total Sells",
      value: "3152.00",
    },
    {
      icon: <PiHandCoinsDuotone />,
      txtColor: "text-amber-600",
      iconBg: "bg-amber-100",
      text: "Total Profit",
      value: "3152.00",
    },
  ];

  const shareHolderStats = [
    {
      img: AhsanImg,
      name: "Ahsan Habib",
      sharePercentage: 30,
      totalInvest: 10000,
      currentShare: (30 / 100) * totalStockPrice,
      ringColor: "ring-purple-500",
    },
    {
      img: SagorImg,
      name: "Sagor Sharif",
      sharePercentage: 30,
      totalInvest: 10000,
      currentShare: (30 / 100) * totalStockPrice,
      ringColor: "ring-green-500",
    },
    {
      img: JahidImg,
      name: "Jahid Akon",
      sharePercentage: 20,
      totalInvest: 7235,
      currentShare: (20 / 100) * totalStockPrice,
      ringColor: "ring-blue-500",
    },
    {
      img: PlaceholderImg,
      name: "Moon",
      sharePercentage: 20,
      totalInvest: 7235,
      currentShare: (20 / 100) * totalStockPrice,
      ringColor: "ring-amber-500",
    },
  ];

  // get all product from database
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://robogear-bd-97bac4d16518.herokuapp.com/products/all-stock-in-product",
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      const totalStockPrice = result.reduce((total, product) => {
        if (product.buying_price && product.qty) {
          const productTotalPrice = product.buying_price * product.qty;
          return total + productTotalPrice;
        }
        return total;
      }, 0);

      setTotalStockPrice(totalStockPrice);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative h-[calc(100vh-81px)] overflow-y-auto p-5">
      <h2 className="mb-5 text-xl font-semibold text-blue-600">
        Admin Dashboard
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
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
