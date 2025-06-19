import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar.jsx";
import { useLocation } from "react-router-dom";
const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* <header>header</header> */}
      {/* <header>
        <Navbar />
      </header> */}
      <header>
        {location.pathname === "/template-typescript/login" ||
        location.pathname === "/template-typescript/register" ? null : (
          <Navbar />
        )}
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* <div className="">footer</div> */}
    </div>
  );
};

export default Layout;
