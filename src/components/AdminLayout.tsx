import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Car,
  PlusCircle,
  Settings,
  BarChart3,
  Clock3,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const SESSION_TIMEOUT = 30 * 60 * 1000;

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");

    if (!loggedIn) {
      navigate("/admin");
      return;
    }

    const updateActivity = () => {
      localStorage.setItem("adminLastActivity", Date.now().toString());
    };

    const checkSession = () => {
      const lastActivity = Number(
        localStorage.getItem("adminLastActivity")
      );

      if (!lastActivity) return;

      if (Date.now() - lastActivity > SESSION_TIMEOUT) {
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminLastActivity");

        alert("Session expired. Please login again.");
        navigate("/admin");
      }
    };

    updateActivity();

    const interval = setInterval(checkSession, 60000);

    window.addEventListener("click", updateActivity);
    window.addEventListener("keydown", updateActivity);

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("keydown", updateActivity);
    };
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminLastActivity");
    navigate("/");
  };

  const NavItem = ({
    to,
    icon,
    label,
  }: {
    to: string;
    icon: React.ReactNode;
    label: string;
  }) => (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className="
        flex items-center gap-3
        px-4 py-3
        rounded-xl
        hover:bg-slate-800
        transition
      "
    >
      {icon}
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-950 text-white flex items-center justify-between p-4 z-50">
        <h1 className="font-black">CarConnectUG</h1>

        <button onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50
          w-72 bg-slate-950 text-white
          flex flex-col
          border-r border-slate-800
          h-full
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* LOGO */}
        <div className="p-8 border-b border-slate-800 mt-14 md:mt-0">
          <h1 className="text-3xl font-black">
            CarConnectUG
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Premium Automotive Platform
          </p>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-6 space-y-2">

          <NavItem
            to="/admin/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
          />

          <NavItem
            to="/admin/vehicles"
            icon={<Car size={20} />}
            label="Vehicles"
          />

          <NavItem
            to="/admin/pending"
            icon={<Clock3 size={20} />}
            label="Pending"
          />

          <NavItem
            to="/admin/add-vehicle"
            icon={<PlusCircle size={20} />}
            label="Add Vehicle"
          />

          <NavItem
            to="/admin/settings"
            icon={<Settings size={20} />}
            label="Settings"
          />

          <NavItem
            to="/admin/analytics"
            icon={<BarChart3 size={20} />}
            label="Analytics"
          />

        </nav>

        {/* BOTTOM */}
        <div className="p-6 border-t border-slate-800">

          <div className="bg-slate-900 rounded-2xl p-4">

            <p className="font-semibold">Admin</p>
            <p className="text-slate-400 text-sm">
              CarConnectUG Owner
            </p>

            <button
              onClick={logout}
              className="
                mt-4 w-full flex items-center justify-center gap-2
                bg-red-600 hover:bg-red-700
                px-4 py-3 rounded-xl transition
              "
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-72 pt-16 md:pt-0 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}