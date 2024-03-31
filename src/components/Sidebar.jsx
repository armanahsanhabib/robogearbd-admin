/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsBoxes } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { LuFiles } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import {
  PiArrowFatLineLeftBold,
  PiArrowFatLineRightBold,
} from "react-icons/pi";
import { TbFileInvoice, TbUsers } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import AhsanImg from "../assets/ahsan.jpg";
import JahidImg from "../assets/jahid.jpg";
import PlaceholderImg from "../assets/placeholder.jpg";
import LOGO from "../assets/robogear logo.png";
import SagorImg from "../assets/sagor.jpg";

const Sidebar = (props) => {
  const location = useLocation();
  const [selectedNav, setSelectedNav] = useState(location.pathname);

  const handleNavClick = (navLink) => {
    setSelectedNav(navLink);
  };

  const NavListItem = (props) => {
    return (
      <li
        className={`rounded-md font-semibold ${
          selectedNav === props.navLink
            ? "bg-blue-500 font-bold text-white"
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
    <div className="flex w-[300px] flex-col justify-between p-5 pr-0">
      <div className="top flex flex-col gap-8">
        <div className="logo mt-5">
          <Link to="/" onClick={() => setSelectedNav("/")}>
            <img src={LOGO} className="mx-auto mb-5 w-[50%]" alt="logo" />
          </Link>
          <h2 className="rounded-md bg-slate-500 px-3 py-2 text-center text-xl font-bold text-white">
            Admin Panel
          </h2>
        </div>
        <div className="profile flex flex-col items-center">
          <img
            src={
              props.userData.fullName === "Ahsan Habib"
                ? AhsanImg
                : props.userData.fullName === "Sagor Sharif"
                  ? SagorImg
                  : props.userData.fullName === "Jahid Akon"
                    ? JahidImg
                    : PlaceholderImg
            }
            alt={props.userData.fullName}
            className="h-[80px] rounded-full border-[5px] border-white"
          />
          <div className="text text-center">
            <h2 className="text-xl font-bold text-gray-800">
              Mr. {props.userData.fullName}
            </h2>
            <p className="text-sm text-gray-500">{props.userData.email}</p>
          </div>
        </div>
        <nav className="">
          <ul className="flex flex-col gap-2">
            <NavListItem
              navLink="/"
              navName="Admin Dashboard"
              navIcon={<MdOutlineSpaceDashboard />}
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
              navLink="/our-customers"
              navName="Our Customers"
              navIcon={<TbUsers />}
            />
            <NavListItem
              navLink="/create-invoice"
              navName="Create Invoice"
              navIcon={<TbFileInvoice />}
            />
            <NavListItem
              navLink="/all-invoices"
              navName="All Invoices"
              navIcon={<LuFiles />}
            />
          </ul>
        </nav>
      </div>
      <div className="bottom">
        <button
          type="button"
          onClick={() => props.logout()}
          className="flex w-full items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 font-semibold transition-all hover:gap-3 hover:bg-rose-500 hover:text-white"
        >
          <FiLogOut className="text-xl" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
