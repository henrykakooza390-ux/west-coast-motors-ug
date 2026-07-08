import { useState } from "react";
import { useNavigate } from "react-router-dom";
import siteConfig from "../config/siteConfig";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const savedPassword =
      localStorage.getItem("admin-password") || "admin234";

    if (password === savedPassword) {
      localStorage.setItem("adminLoggedIn", "true");

      localStorage.setItem(
        "adminLastActivity",
        Date.now().toString()
      );

      navigate("/admin/dashboard");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-black
      via-[#0b0b0b]
      to-[#111111]
      px-6
      relative
      overflow-hidden
    ">

      {/* SUBTLE RED GLOW (brand accent) */}
      <div className="
        absolute
        -top-40
        -left-40
        w-[500px]
        h-[500px]
        rounded-full
        bg-brand-red/20
        blur-[160px]
      " />

      <div className="
        absolute
        bottom-0
        right-0
        w-[500px]
        h-[500px]
        rounded-full
        bg-brand-red/10
        blur-[180px]
      " />

      {/* LOGIN CARD */}
      <div className="
        bg-white/10
        backdrop-blur-2xl
        border
        border-white/10
        p-10
        rounded-[32px]
        shadow-2xl
        w-full
        max-w-md
        relative
        z-10
      ">

        {/* BRANDING */}
        <div className="text-center mb-10">

          {/* OPTIONAL LOGO SLOT (future-proof) */}
          {siteConfig.adminLogo && (
            <img
              src={siteConfig.adminLogo}
              alt="Admin Logo"
              className="h-12 mx-auto mb-4 object-contain"
            />
          )}

          <h1 className="
            text-4xl
            font-black
            text-white
            tracking-wide
          ">
            WEST COAST MOTORS UG
          </h1>

          <p className="text-brand-red mt-3 font-medium">
            Admin Portal • Premium Vehicle Management
          </p>

        </div>

        {/* PASSWORD INPUT */}
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full
            bg-black/30
            border
            border-white/10
            text-white
            placeholder:text-gray-400
            p-4
            rounded-2xl
            outline-none
            mb-6
            focus:border-brand-red
            focus:ring-2
            focus:ring-brand-red/30
          "
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="
            w-full
            py-4
            rounded-2xl
            font-bold
            text-white
            bg-brand-red
            hover:bg-red-800
            transition
            shadow-xl
            hover:scale-[1.02]
          "
        >
          Login
        </button>

      </div>
    </div>
  );
}