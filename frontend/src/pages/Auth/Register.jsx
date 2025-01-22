import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Create Account
            </h1>

            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center font-medium"
              >
                {isLoading ? <Loader /> : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Animated Image Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-md animate-float">
              <svg className="w-full h-auto" viewBox="0 0 400 400">
                {/* Shop Building */}
                <rect x="100" y="150" width="200" height="200" fill="#4B5563" />
                <rect x="80" y="130" width="240" height="20" fill="#374151" />
                <rect x="150" y="250" width="100" height="100" fill="#F3F4F6" />

                {/* Animated Shopping Cart */}
                <g className="animate-bounce">
                  <circle cx="180" cy="380" r="10" fill="#60A5FA" />
                  <circle cx="220" cy="380" r="10" fill="#60A5FA" />
                  <path
                    d="M160 360 L240 360 L230 330 L170 330 Z"
                    fill="#2563EB"
                  />
                </g>

                {/* Animated Stars */}
                <g className="animate-pulse">
                  <path d="M50 50 L60 60 L50 70 L40 60 Z" fill="#FCD34D" />
                  <path d="M300 80 L310 90 L300 100 L290 90 Z" fill="#FCD34D" />
                  <path
                    d="M350 150 L360 160 L350 170 L340 160 Z"
                    fill="#FCD34D"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
