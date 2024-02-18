import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Announcement from "./components/announce/Announcement";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />

      <main className="py-3">
      <Announcement/>

        <Outlet />
      </main>
    </>
  );
};

export default App;
