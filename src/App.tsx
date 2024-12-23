import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { useAuthStore } from "./store/useAuthStore";
import { toast, ToastContainer } from "react-toastify";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearToken } = useAuthStore();
  // Check if the current path is the login page
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      {/* Conditionally render the header */}
      {!isLoginPage && (
        <header>
          <nav className="px-4 py-4 flex flex-col gap-4 shadow-xl border rounded-xl ">
            <ul className="flex justify-between  items-center ">
              <li>
                <Link to="/dashboard" className="text-lg font-sans font-medium">
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    clearToken();
                    toast.success("Logout Successful!");
                    navigate("/login");
                  }}
                  className="btn bg-[#9414FF] py-1 px-3 w-fit rounded-lg text-white"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </header>
      )}
      <main>
        <Outlet />
        <ToastContainer />
      </main>
    </div>
  );
}
