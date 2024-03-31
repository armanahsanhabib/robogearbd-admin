/* eslint-disable react/prop-types */
import LoginCover from "../assets/login cover page.png";
import LOGO from "../assets/robogear logo.png";
import LOGO_TXT from "../assets/robogear text logo.png";

const LoginPage = (props) => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#bbd4d9] p-3">
      <div className="m-5 grid h-[calc(100%-40px)] grid-cols-2 overflow-hidden rounded-lg border bg-[#f8fbff]">
        <div className="left border-r bg-gray-50">
          <div
            className="img h-full w-full"
            // style={{
            //   backgroundImage: `url('${LoginCover}')`,
            //   backgroundRepeat: "no-repeat",
            //   backgroundPosition: "center",
            //   backgroundSize: "700px",
            // }}
          >
            <div className="top pl-8 pt-8">
              <img src={LOGO} alt="robogear logo" className="h-[50px]" />
            </div>
            <div className="flex flex-col items-center justify-center px-10">
              <img
                src={LoginCover}
                alt="login cover"
                className="max-h-[600px]"
              />
              <h1 className="mt-5 text-center text-2xl font-semibold text-gray-500">
                Robotics: where science fiction <br /> becomes reality.
              </h1>
            </div>
          </div>
        </div>
        <div className="right flex items-center justify-center">
          <div className="item flex w-[350px] flex-col items-center gap-5">
            <div className="text text-center">
              <img
                src={LOGO_TXT}
                alt="robogear logo"
                className="mx-auto mb-[60px] h-[20px]"
              />
              <h2 className="mb-2 text-2xl font-bold text-gray-700">
                Admin Login
              </h2>
              <p className="text-sm font-[400] text-gray-500">
                Enter your admin panel username and password
              </p>
              {props.error && (
                <div className="mt-3 text-red-500">{props.error}</div>
              )}
            </div>
            <form
              onSubmit={props.handleSubmit}
              className="form grid w-full grid-cols-1 gap-3"
            >
              <input
                type="text"
                name="username"
                id="username"
                required
                onChange={props.handleUsernameChange}
                className="w-full rounded-lg border bg-[#f3f1ff] px-5 py-2 outline-none focus:border-[#6f5bf0]"
                placeholder="Username"
              />
              <input
                type="password"
                name="password"
                id="password"
                required
                onChange={props.handlePasswordChange}
                className="w-full rounded-lg border bg-[#f3f1ff] px-5 py-2 outline-none focus:border-[#6f5bf0]"
                placeholder="Password"
              />
              <input
                type="submit"
                value="Login"
                className="mx-auto mt-3 w-max cursor-pointer rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-10 py-2 text-lg font-bold text-white transition-all hover:bg-gradient-to-l"
              />
            </form>
            <hr />
            <p className="text-center font-[400] text-gray-700">
              Don&apos;t have account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Signup
              </a>{" "}
              to create new account!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
