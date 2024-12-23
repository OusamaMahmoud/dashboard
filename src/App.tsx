import { Link, Outlet, useLocation } from "react-router";

export default function App() {
  const location = useLocation();

  // Check if the current path is the login page
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      {/* Conditionally render the header */}
      {!isLoginPage && (
        <header>
          <nav className="p-4 flex flex-col gap-4 bg-slate-300 p-4">
            <ul className="flex gap-4">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/login" className="">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      )}
      <main>
        <Outlet />{" "}
        {/* Dynamically renders child routes like Login or Dashboard */}
      </main>
    </div>
  );
}
