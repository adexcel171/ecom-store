import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Announcement from "./components/announce/Announcement";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navigation />

      <main className="mt-3">
        <ToastContainer className="mt-3 z-50" />

        <Announcement />

        <Outlet />
      </main>
    </>
  );
};

export default App;
