import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
// import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Announcement from "./components/announce/Announcement";
import Footer from "./components/Footer";
const Navigation = lazy(() => import("./pages/Auth/Navigation"));
// const Announcement = lazy(() => import("./components/announce/Announcement"));?

const App = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation />

        <main className="mt-3">
          <ToastContainer className="mt-3 w-[70px] z-50" />

          {/* <Announcement /> */}

          <Outlet />
        </main>
      </Suspense>
    </>
  );
};

export default App;
