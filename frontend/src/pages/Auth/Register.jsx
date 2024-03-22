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
    <section className="pl-[1rem] mt-10 md:pl-[10rem] flex flex-wrap">
  <div className="w-full px-2 md:w-1/2 mt-5 md:mt-4 md:mr-4">
    <h1 className="text-2xl font-semibold mb-4">Register</h1>

    <form onSubmit={submitHandler} className="container w-full md:w-[40rem]">
      <div className="my-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-black"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="mt-1 p-2 border rounded w-full  sm:w-[400px]"
          placeholder="Enter name"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="my-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-black "
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 p-2 border rounded w-full  sm:w-[400px]"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="my-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-black"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 p-2 border rounded w-full  sm:w-[400px]"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="my-2">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-black"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="mt-1 p-2 border rounded w-full  sm:w-[400px]"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="bg-teal-500 text-black px-4 py-2 rounded cursor-pointer my-1"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>

      {isLoading && <Loader />}
    </form>

    <div className="mt-4">
      <p className="text-black">
        Already have an account?{" "}
        <Link
          to={redirect ? `/login?redirect=${redirect}` : "/login"}
          className="text-teal-500 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
  <img
    src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
    alt=""
    className="h-[15rem] md:h-[40rem] w-full md:w-[50%] lg:w-[60%] xl:block md:hidden sm:hidden rounded-lg"
  />
</section>

  );
};

export default Register;
