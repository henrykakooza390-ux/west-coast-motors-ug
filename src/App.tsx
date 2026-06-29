import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { VehiclesProvider } from "./context/VehiclesContext";

import Home from "./pages/Home";
import VehicleDetails from "./pages/VehicleDetails";
import CarsByCategory from "./pages/CarsByCategory";
import SearchResults from "./pages/SearchResults";
import SubmitVehicle from "./pages/SubmitVehicle";
import Favorites from "./pages/Favorites";
import Compare from "./pages/CompareVehicles";

import AdminLogin from "./pages/AdminLogin";

import Dashboard from "./pages/admin/Dashboard";
import Vehicles from "./pages/admin/Vehicles";
import AddVehicle from "./pages/admin/AddVehicle";
import EditVehicle from "./pages/admin/EditVehicle";
import PendingVehicles from "./pages/admin/PendingVehicles";
import EditPendingVehicle from "./pages/admin/EditPendingVehicle";
import Settings from "./pages/admin/Settings";
import ActivityLogs from "./pages/admin/ActivityLogs";
import Analytics from "./pages/admin/Analytics";

import AdminLayout from "./components/AdminLayout";

function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedIn =
    localStorage.getItem("adminLoggedIn") === "true";

  if (!loggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}

function AdminWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <BrowserRouter>
      <VehiclesProvider>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/cars/:bodyType" element={<CarsByCategory />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/submit-vehicle" element={<SubmitVehicle />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/compare" element={<Compare />} />

          <Route path="/admin" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <AdminWrapper>
                <Dashboard />
              </AdminWrapper>
            }
          />

          <Route
            path="/admin/vehicles"
            element={
              <AdminWrapper>
                <Vehicles />
              </AdminWrapper>
            }
          />

          <Route
            path="/admin/add-vehicle"
            element={
              <AdminWrapper>
                <AddVehicle />
              </AdminWrapper>
            }
          />

          <Route
            path="/admin/edit-vehicle/:id"
            element={
              <AdminWrapper>
                <EditVehicle />
              </AdminWrapper>
            }
          />

          <Route
            path="/admin/pending"
            element={
              <AdminWrapper>
                <PendingVehicles />
              </AdminWrapper>
            }
          />

          <Route
            path="/admin/edit-pending/:id"
            element={
              <AdminWrapper>
                <EditPendingVehicle />
              </AdminWrapper>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <AdminWrapper>
                <Settings />
              </AdminWrapper>
            }
          />

          <Route
            path="/admin/analytics"
            element={
              <AdminWrapper>
                <Analytics />
              </AdminWrapper>
            }
          />

          <Route
            path="/admin/logs"
            element={
              <AdminWrapper>
                <ActivityLogs />
              </AdminWrapper>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>

      </VehiclesProvider>
    </BrowserRouter>
  );
}

export default App;