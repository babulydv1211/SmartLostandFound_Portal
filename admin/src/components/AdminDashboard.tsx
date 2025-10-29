
import React from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import Users from './Users'
import LostItems from './LostItems'
import FoundItems from './FoundItems'
import MatchingItems from './MatchingItems'
import { useAuth } from "../contexts/AuthContext";

const AdminDashboard: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navigation = [
    { name: 'Users', href: '/dashboard/users', icon: '👥' },
    { name: 'Lost Items', href: '/dashboard/lost-items', icon: '🔍' },
    { name: 'Found Items', href: '/dashboard/found-items', icon: '📦' },
    { name: 'Matching Items', href: '/dashboard/matching-items', icon: '💫' },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-1500"></div>
      </div>

      {/* Sidebar */}
      <div className="w-64 backdrop-blur-xl bg-white/5 border-r border-white/10 shadow-2xl relative z-10">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-base text-gray-400 mt-1">Management Dashboard</p>
        </div>
        
        <nav className="mt-6 px-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-lg font-medium rounded-lg mb-2 transition-all duration-200 ${
                location.pathname === item.href 
                  ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-lg mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-64 p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 shadow-lg transition-all duration-200 backdrop-blur-sm"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative z-10">
        <div className="p-6">
          <Routes>
            <Route path="users" element={<Users />} />
            <Route path="lost-items" element={<LostItems />} />
            <Route path="found-items" element={<FoundItems />} />
            <Route path="matching-items" element={<MatchingItems />} />
            <Route path="/" element={
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  Welcome to Admin Dashboard
                </h1>
                <p className="text-gray-300 text-lg">
                  Select a section from the sidebar to manage your platform.
                </p>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard