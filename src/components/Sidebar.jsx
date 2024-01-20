/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsBoxes } from "react-icons/bs";
import { LuFiles } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import {
  PiArrowFatLineLeftBold,
  PiArrowFatLineRightBold,
} from "react-icons/pi";
import { TbFileInvoice } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import LOGO from "../assets/robogear logo.png";

const Sidebar = () => {
  const location = useLocation();
  const [selectedNav, setSelectedNav] = useState(location.pathname);

  const handleNavClick = (navLink) => {
    setSelectedNav(navLink);
  };

  const NavListItem = (props) => {
    return (
      <li
        className={`rounded-lg font-semibold ${
          selectedNav === props.navLink
            ? "bg-purple-500 font-bold text-white"
            : ""
        }`}
        onClick={() => handleNavClick(props.navLink)}
      >
        {/* Use Link instead of a */}
        <Link to={props.navLink} className="flex items-center gap-2 px-3 py-2">
          <span className="text-xl">{props.navIcon}</span>
          <span>{props.navName}</span>
        </Link>
      </li>
    );
  };

  return (
    <div className="min-h-screen border-r bg-gray-100 p-5">
      <div className="logo">
        <Link to="/" onClick={() => setSelectedNav("/")}>
          <img src={LOGO} className="mx-auto mb-5 w-[50%]" alt="logo" />
        </Link>
      </div>
      <div className="nav">
        <h2 className="rounded-lg bg-blue-600 px-3 py-2 text-center text-xl font-bold text-white">
          Admin Panel
        </h2>
      </div>
      <nav className="mt-5">
        <ul className="flex flex-col gap-2">
          <NavListItem
            navLink="/"
            navName="Admin Dashboard"
            navIcon={<MdOutlineSpaceDashboard />}
          />
          <NavListItem
            navLink="/create-invoice"
            navName="Create Invoice"
            navIcon={<TbFileInvoice />}
          />
          <NavListItem
            navLink="/products-management"
            navName="Products List"
            navIcon={<BsBoxes />}
          />
          <NavListItem
            navLink="/stock-in"
            navName="Stock In"
            navIcon={<PiArrowFatLineRightBold />}
          />
          <NavListItem
            navLink="/stock-out"
            navName="Stock Out"
            navIcon={<PiArrowFatLineLeftBold />}
          />
          <NavListItem
            navLink="/all-invoices"
            navName="All Invoices"
            navIcon={<LuFiles />}
          />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
