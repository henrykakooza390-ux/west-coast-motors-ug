import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated =
    localStorage.getItem("admin-auth") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}