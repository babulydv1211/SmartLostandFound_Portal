
import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import Users from './Users'
import LostItems from './LostItems'
import FoundItems from './FoundItems'
import MatchingItems from './MatchingItems'
import { useAuth } from "../contexts/AuthContext";
import { useNotifications } from '../contexts/NotificationContext';

const AdminDashboard: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { notificationCounts, resetNotification } = useNotifications()
  
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navigation = [
    { 
      name: 'Users', 
      href: '/dashboard/users', 
      icon: '👥',
      key: 'users' as const
    },
    { 
      name: 'Lost Items', 
      href: '/dashboard/lost-items', 
      icon: '🔍',
      key: 'lostItems' as const
    },
    { 
      name: 'Found Items', 
      href: '/dashboard/found-items', 
      icon: '📦',
      key: 'foundItems' as const
    },
    { 
      name: 'Matching Items', 
      href: '/dashboard/matching-items', 
      icon: '💫',
      key: 'matchingItems' as const
    },
  ]

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleNavigationClick = (navItem: typeof navigation[0]) => {
    // Reset notification count for this section
    resetNotification(navItem.key);
    // Close sidebar on mobile
    setIsSidebarOpen(false);
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-1500"></div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white shadow-lg"
      >
        ☰
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-40
        w-64 backdrop-blur-xl bg-white/5 border-r border-white/10 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 md:p-6 border-b border-white/10">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-sm md:text-base text-gray-400 mt-1">Management Dashboard</p>
        </div>
        
        <nav className="mt-4 md:mt-6 px-2 md:px-3">
          {navigation.map((item) => (
            <div key={item.name} className="relative mb-2">
              <Link
                to={item.href}
                onClick={() => handleNavigationClick(item)}
                className={`flex items-center justify-between px-3 py-3 md:px-4 md:py-3 text-base md:text-lg font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === item.href 
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3">{item.icon}</span>
                  {item.name}
                </div>
                
                {/* Notification Badge */}
                {notificationCounts[item.key] > 0 && (
                  <span className="flex items-center justify-center min-w-6 h-6 px-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                    {notificationCounts[item.key] > 99 ? '99+' : notificationCounts[item.key]}
                  </span>
                )}
              </Link>
            </div>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 md:p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 shadow-lg transition-all duration-200 backdrop-blur-sm"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative z-10 md:ml-0">
        <div className="p-4 md:p-6 mt-16 md:mt-0">
          <Routes>
            <Route path="users" element={<Users />} />
            <Route path="lost-items" element={<LostItems />} />
            <Route path="found-items" element={<FoundItems />} />
            <Route path="matching-items" element={<MatchingItems />} />
            <Route path="/" element={
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl md:rounded-2xl shadow-2xl p-6 md:p-8 text-center">
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  Welcome to Admin Dashboard
                </h1>
                <p className="text-gray-300 text-base md:text-lg">
                  Select a section from the sidebar to manage your platform.
                </p>
                
                {/* Notification Summary */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {navigation.map((item) => (
                    <div key={item.key} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-white font-medium text-sm">{item.name}</div>
                      {notificationCounts[item.key] > 0 ? (
                        <div className="text-red-400 text-xs font-bold mt-1">
                          {notificationCounts[item.key]} new
                        </div>
                      ) : (
                        <div className="text-gray-400 text-xs mt-1">No new</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard



