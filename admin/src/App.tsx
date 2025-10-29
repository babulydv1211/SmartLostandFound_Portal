
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
