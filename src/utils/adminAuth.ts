export const isAdminLoggedIn = () => {
  return localStorage.getItem("admin-auth") === "true";
};

export const logoutAdmin = () => {
  localStorage.removeItem("admin-auth");
};

export const updateAdminPassword = (newPassword: string) => {
  localStorage.setItem("carconnect-admin-password", newPassword);
};