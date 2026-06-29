import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-[#07152f]
      via-[#0A1E4D]
      to-[#04142f]
      px-6
      relative
      overflow-hidden
      "
    >
      {/* Glow */}
      <div
        className="
        absolute
        -top-40
        -left-40
        w-[500px]
        h-[500px]
        rounded-full
        bg-blue-500/20
        blur-[150px]
        "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        w-[500px]
        h-[500px]
        rounded-full
        bg-blue-400/10
        blur-[180px]
        "
      />

      <div
        className="
        bg-white/10
        backdrop-blur-2xl
        border
        border-white/20
        p-10
        rounded-[32px]
        shadow-2xl
        w-full
        max-w-md
        relative
        z-10
        "
      >
        <div className="text-center mb-10">

          <h1
            className="
            text-4xl
            font-black
            text-white
            "
          >
            Admin Portal
          </h1>

          <p className="text-blue-100 mt-3">
            Sign in to manage vehicles and listings
          </p>

        </div>

        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
          w-full
          bg-white/10
          border
          border-white/20
          text-white
          placeholder:text-gray-300
          p-4
          rounded-2xl
          outline-none
          mb-6
          "
        />

        <button
          onClick={handleLogin}
          className="
          w-full
          py-4
          rounded-2xl
          font-bold
          text-white
          bg-[#2563EB]
          hover:bg-[#0A1E4D]
          transition
          shadow-xl
          "
        >
          Login
        </button>

      </div>
    </div>
  );
}