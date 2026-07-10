import siteConfig from "../config/siteConfig";
import { NavLink, useNavigate } from "react-router-dom";
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
  <NavLink
    to={to}
    onClick={() => setOpen(false)}
    className={({ isActive }) =>
      `
      group
      flex
      items-center
      gap-4
      rounded-2xl
      px-4
      py-3
      font-medium
      transition-all
      duration-200
      ${
        isActive
          ? "bg-brand-red text-white shadow-lg"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      }
      `
    }
  >
    <div
      className="
      flex
      h-10
      w-10
      items-center
      justify-center
      rounded-xl
      bg-white/5
      transition-all
      duration-200
      group-hover:bg-white/10
      "
    >
      {icon}
    </div>

    <span>{label}</span>
  </NavLink>
);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-950 text-white flex items-center justify-between p-4 z-50">

        <div className="flex items-center gap-3">

  <img
    src={siteConfig.adminLogo}
    alt={siteConfig.companyName}
    className="h-8 w-auto object-contain"
  />

  <div>

    <h1 className="text-sm font-bold leading-none text-white">
      {siteConfig.companyName}
    </h1>

    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-red">
      {siteConfig.admin.subtitle}
    </p>

  </div>

</div>

        <button
  onClick={() => setOpen((prev) => !prev)}
  className="p-1"
>
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
fixed
top-0
left-0
z-50
h-screen
w-72
overflow-y-auto
overflow-x-hidden
bg-gradient-to-b
from-slate-950
via-slate-900
to-slate-950
border-r
border-white/10
shadow-xl
text-white
flex
flex-col
transition-transform
duration-300
ease-in-out

transform

${
  open
    ? "translate-x-0"
    : "-translate-x-full"
}

lg:translate-x-0
lg:static
`}
      >

        {/* LOGO */}
<div
  className="
    px-6
    py-5
    md:px-8
    md:py-8
    border-b
    border-white/10
    mt-14
    md:mt-0
  "
>

  <div className="flex justify-center mb-6">
    <img
  src={siteConfig.adminLogo}
  alt={siteConfig.companyName}
  className="
  h-12
  md:h-20
  w-auto
  object-contain
  mx-auto
  "
/>
  </div>

  <h1 className="mt-6 text-center text-2xl font-black tracking-tight">
    {siteConfig.companyName}
</h1>

<p className="mt-2 text-center text-xs uppercase tracking-[0.25em] text-brand-red font-semibold">
    {siteConfig.tagline}
</p>

  <p className="text-brand-red font-semibold mt-2 text-sm">
   westcoastmotorsug.com
  </p>

</div>

        {/* NAV */}
        <nav
  className="
  flex-1
  px-4
  py-4
  space-y-2
  "
>

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
<div className="border-t border-white/10 p-6">

          <div
className="
rounded-3xl
bg-gradient-to-br
from-slate-900
to-slate-800
border
border-white/10
p-4
shadow-lg
"
>

            <p className="font-bold text-brand-red">
              Administrator
            </p>

            <p className="text-brand-red font-semibold text-sm">
              WEST COAST MOTORS UG OWNER
            </p>

            <button
              onClick={logout}
              className="
                mt-4 w-full flex items-center justify-center gap-2
                bg-brand-red
hover:brightness-110
active:scale-95
transition-all
duration-200
shadow-lg
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
      <main
className="
flex-1
overflow-y-auto
bg-slate-100
lg:ml-72lg:ml-72
"
>
        {children}
      </main>

    </div>
  );
}