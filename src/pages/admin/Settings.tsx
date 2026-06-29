import { useEffect, useState } from "react";

export default function Settings() {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  useEffect(() => {
    const storedPassword =
      localStorage.getItem("admin-password") ||
      "admin234";

    setCurrentPassword(storedPassword);
  }, []);

  const savePassword = () => {
    if (!newPassword.trim()) {
      alert("Password cannot be empty");
      return;
    }

    localStorage.setItem(
      "admin-password",
      newPassword
    );

    setCurrentPassword(newPassword);

    alert(
      "Admin password updated successfully"
    );

    setNewPassword("");
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Admin Settings
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Admin Password
        </h2>

        <div className="mb-6">

          <p className="text-gray-500 mb-2">
            Current Password
          </p>

          <div className="border rounded-xl p-4 bg-gray-50 font-semibold">
            {currentPassword}
          </div>

        </div>

        <div>

          <p className="text-gray-500 mb-2">
            New Password
          </p>

          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            className="
              w-full
              border
              p-4
              rounded-xl
            "
          />

        </div>

        <button
          onClick={savePassword}
          className="
            mt-6
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
          "
        >
          Save Password
        </button>

      </div>

    </div>
  );
}