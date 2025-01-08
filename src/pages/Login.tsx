import { Button } from "antd";
import alatheia_logo from "../media/logos/alatheia-logo-blanco.svg";
import left_gif from "../media/temporal/anlitics-purple.gif";

function Login() {
  return (
    <>
      <div className="flex h-screen w-screen bg-gray-200 p-5">
        {/* Left Section */}
        <div className="w-3/5 flex items-center justify-center bg-gray-200">
          <div className="m-5 bg-green-200 rounded-3xl overflow-hidden w-full h-full">
            <img
              className="w-full h-full object-cover"
              src={left_gif}
              alt="Statistics"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-2/5 flex items-center justify-center bg-gray-200">
          <div className="w-full h-full m-5 bg-white rounded-3xl flex flex-col justify-center items-center">
            <div className="p-8 w-3/4 flex flex-col items-center">
              {/* Logo Section */}
              <div className="mb-20">
                <img
                  width="80%"
                  src={alatheia_logo}
                  alt="Alatheia Logo"
                  className="mx-auto"
                />
              </div>
              {/* Login Form */}
              <form className="space-y-6 w-full">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-textgrey-100"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-textgrey-100"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                    placeholder="Enter your password"
                  />
                </div>

                <Button type="primary" className="w-full border-0">
                  Loign
                </Button>
              </form>

              {/* Footer Section */}
              <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account?{" "}
                <a href="#" className="text-primary-500 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
