import { Outlet, useLocation } from "react-router-dom"; // Added useLocation
import { lazy, Suspense, useEffect } from "react"; // Added useEffect
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
const Navigation = lazy(() => import("./pages/Auth/Navigation"));

const App = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation />
        <main className="mt-3">
          <ToastContainer className="mt-3 w-[70px] z-50" />
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};

export default App;
