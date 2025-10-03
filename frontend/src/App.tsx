import { Navigate, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
// import LoginPage from "./pages/LoginPage"
// import SignupPage from "./pages/SignupPage"
import AuthPage from "./pages/AuthPage"
import DashboardPage from "./pages/DashboardPage"
import RootLayout from "./layouts/RootLayout"
import ProtectedRoute from "./components/auth/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> */}
        <Route path="/login" element={<AuthPage />} />
       <Route path="/signup" element={<AuthPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
