import PROFILE from "../assets/profile.jpg";

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b bg-gray-100 p-5">
      <div className="left">
        <h3 className="text-2xl font-bold">Overview</h3>
      </div>
      <div className="center">center</div>
      <div className="right">
        <div className="actions"></div>
        <div className="profile flex items-center gap-2">
          <div className="name text-right">
            <h3 className="text-sm font-semibold">Ahsan Habib</h3>
            <p className="text-sm">Admin</p>
          </div>
          <div className="image">
            <img
              src={PROFILE}
              className="h-[35px] w-[35px] rounded-full ring ring-amber-600"
              alt="profile pic"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
