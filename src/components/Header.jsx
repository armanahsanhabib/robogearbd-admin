/* eslint-disable react/prop-types */
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

const Header = (props) => {
  return (
    <header className="mb-2 flex items-center justify-between border-b p-3">
      <div className="left">
        <h1 className="text-2xl font-bold text-gray-800">{props.title}</h1>
      </div>
      {!props.action ? (
        <div className="right flex items-center gap-3 text-gray-800">
          <button
            type="button"
            className="notification_bell rounded-full bg-white p-2 text-xl drop-shadow-md"
          >
            <IoMdNotifications />
          </button>
          <button
            type="button"
            className="notification_bell rounded-full bg-white p-2 text-xl drop-shadow-md"
          >
            <MdOutlineMarkEmailUnread />
          </button>
        </div>
      ) : (
        <div className="">{props.action}</div>
      )}
    </header>
  );
};

export default Header;
