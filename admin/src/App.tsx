
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext"; // Remove this import from here

const queryClient = new QueryClient();

// Create a separate component for the routed content
const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* ✅ Login Route */}
      <Route
        path="/login"
        element={!isAuthenticated ? <AdminLogin /> : <Navigate to="/dashboard" />}
      />
      
      {/* ✅ Optional alias route */}
      <Route path="/admin/login" element={<Navigate to="/login" />} />

      {/* ✅ Protected dashboard route */}
      <Route
        path="/dashboard/*"
        element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />}
      />

      {/* ✅ Root redirect */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />

      {/* ✅ Catch-all for any unknown route */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;