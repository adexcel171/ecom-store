import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Welcome Back
            </h1>

            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center font-medium"
              >
                {isLoading ? <Loader /> : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                New Customer?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          {/* Animated Image Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-md animate-float">
              <svg className="w-full h-auto" viewBox="0 0 400 400">
                {/* User Circle */}
                <circle
                  cx="200"
                  cy="150"
                  r="60"
                  fill="#4B5563"
                  className="animate-pulse"
                />
                <circle cx="200" cy="130" r="25" fill="#9CA3AF" />
                <path d="M160 180 Q200 220 240 180" fill="#9CA3AF" />

                {/* Decorative Elements */}
                <g className="animate-bounce">
                  <circle cx="120" cy="250" r="8" fill="#60A5FA" />
                  <circle cx="280" cy="250" r="8" fill="#60A5FA" />
                  <circle cx="200" cy="280" r="8" fill="#60A5FA" />
                </g>

                {/* Animated Lock */}
                <g transform="translate(150, 300)" className="animate-wiggle">
                  <rect
                    x="15"
                    y="0"
                    width="70"
                    height="50"
                    rx="10"
                    fill="#2563EB"
                  />
                  <path
                    d="M30 0 L30 -20 Q50 -20 70 -20 L70 0"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="12"
                  />
                </g>

                {/* Animated Stars */}
                <g className="animate-twinkle">
                  <path d="M80 100 L90 110 L80 120 L70 110 Z" fill="#FCD34D" />
                  <path
                    d="M300 120 L310 130 L300 140 L290 130 Z"
                    fill="#FCD34D"
                  />
                  <path d="M320 80 L330 90 L320 100 L310 90 Z" fill="#FCD34D" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
