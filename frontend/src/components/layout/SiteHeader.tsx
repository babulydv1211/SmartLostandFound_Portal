
"use client"

import { Link, NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, Bell, User, Sparkles, Home, LayoutDashboard, Info, Contact } from "lucide-react"
import { useAuth } from "../../providers/AuthProvider"

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Lost&Found", icon: LayoutDashboard },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Contact },
]

function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-gray-900/95 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl shadow-purple-500/10 py-2" 
          : "bg-slate-900/80 backdrop-blur-lg border-b border-slate-600/50 shadow-lg py-2"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3"
        >
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                scrolled 
                  ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/30" 
                  : "bg-gradient-to-br from-cyan-500 to-blue-500 shadow-cyan-500/30"
              }`}>
                <Sparkles size={24} className="text-white" />
              </div>
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
                className={`absolute -inset-1 rounded-2xl blur opacity-30 transition-all ${
                  scrolled ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gradient-to-r from-cyan-500 to-blue-500"
                }`}
              />
            </motion.div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg transition-all ${
                scrolled 
                  ? "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" 
                  : "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              }`}>
                Smart Lost & Found
              </span>
              <span className={`text-xs transition-all ${
                scrolled ? "text-gray-400" : "text-slate-400"
              } -mt-1`}>
                Campus Connect
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) => {
                  const baseClasses = "relative px-5 py-3 text-base font-medium transition-all duration-300 group flex items-center gap-2 rounded-xl"
                  
                  if (isActive) {
                    return scrolled 
                      ? `${baseClasses} text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30` 
                      : `${baseClasses} text-white bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30`
                  } else {
                    return scrolled 
                      ? `${baseClasses} text-gray-300 hover:text-white hover:bg-gray-800/50` 
                      : `${baseClasses} text-slate-300 hover:text-white hover:bg-slate-700/50`
                  }
                }}
              >
                {({ isActive }) => (
                  <>
                    <link.icon size={20} className="transition-all" />
                    <span className="relative z-10">{link.label}</span>
                    {!isActive && (
                      <motion.div
                        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all ${
                          scrolled 
                            ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10" 
                            : "bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
                        }`}
                        whileHover={{ scale: 1.02 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          {isAuthenticated ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 transition-all rounded-xl ${
                  scrolled 
                    ? "text-gray-300 hover:text-white hover:bg-gray-800/50" 
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <Search size={22} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-3 transition-all rounded-xl ${
                  scrolled 
                    ? "text-gray-300 hover:text-white hover:bg-gray-800/50" 
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <Bell size={22} />
                <motion.div
                  className="absolute top-2 right-2 w-3 h-3 bg-red-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-all ${
                  scrolled 
                    ? "bg-gray-800/50 border-gray-700" 
                    : "bg-slate-700/50 border-slate-600"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  scrolled 
                    ? "bg-gradient-to-br from-purple-500 to-pink-500" 
                    : "bg-gradient-to-br from-cyan-500 to-blue-500"
                }`}>
                  <User size={20} className="text-white" />
                </div>
                <span className={`text-base font-medium transition-all ${
                  scrolled ? "text-white" : "text-white"
                }`}>
                  {user?.name || "User"}
                </span>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <NavLink
                  to="/login"
                  className={({ isActive }) => {
                    const baseClasses = "relative px-6 py-3 text-base font-semibold transition-all duration-300 rounded-xl"
                    
                    if (scrolled) {
                      return isActive
                        ? `${baseClasses} text-white bg-purple-500/20 border border-purple-500/30`
                        : `${baseClasses} text-purple-300 hover:text-white hover:bg-purple-500/20`
                    } else {
                      return isActive
                        ? `${baseClasses} text-white bg-cyan-500/20 border border-cyan-500/30`
                        : `${baseClasses} text-cyan-300 hover:text-white hover:bg-cyan-500/20`
                    }
                  }}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block"
                  >
                    Log in
                  </motion.span>
                </NavLink>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <NavLink
                  to="/signup"
                  className="relative overflow-hidden group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-6 py-3 text-base font-semibold text-white rounded-xl shadow-lg transition-all ${
                      scrolled
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/30 hover:from-purple-600 hover:to-pink-600"
                        : "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/30 hover:from-cyan-600 hover:to-blue-600"
                    }`}
                  >
                    <span className="relative z-10">Join Portal</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: scrolled 
                          ? "linear-gradient(to right, rgb(192, 38, 211), rgb(219, 39, 119))"
                          : "linear-gradient(to right, rgb(6, 182, 212), rgb(59, 130, 246))"
                      }}
                    />
                  </motion.div>
                </NavLink>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`inline-flex items-center justify-center rounded-xl p-3 transition-all lg:hidden ${
            scrolled 
              ? "border border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white" 
              : "border border-slate-600 bg-slate-700/50 text-slate-300 hover:bg-slate-600 hover:text-white"
          }`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`lg:hidden border-t ${
              scrolled 
                ? "border-gray-700 bg-gray-900/95 backdrop-blur-xl" 
                : "border-slate-600 bg-slate-800/95 backdrop-blur-xl"
            }`}
          >
            <div className="flex flex-col px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => {
                      const baseClasses = "flex items-center gap-3 rounded-xl px-4 py-4 text-lg font-medium transition-all duration-300"
                      
                      if (scrolled) {
                        return isActive
                          ? `${baseClasses} bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30`
                          : `${baseClasses} text-gray-300 hover:bg-gray-800 hover:text-white`
                      } else {
                        return isActive
                          ? `${baseClasses} bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30`
                          : `${baseClasses} text-slate-300 hover:bg-slate-700 hover:text-white`
                      }
                    }}
                  >
                    <link.icon size={22} className="transition-all" />
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              
              {isAuthenticated ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4 border-t space-y-3"
                  style={{ borderColor: scrolled ? '#374151' : '#475569' }}
                >
                  <div className={`flex items-center gap-3 px-4 py-4 rounded-xl border ${
                    scrolled ? "bg-gray-800/50 border-gray-700" : "bg-slate-700/50 border-slate-600"
                  }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      scrolled 
                        ? "bg-gradient-to-br from-purple-500 to-pink-500" 
                        : "bg-gradient-to-br from-cyan-500 to-blue-500"
                    }`}>
                      <User size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-lg ${
                        scrolled ? "text-white" : "text-white"
                      }`}>
                        {user?.name || "User"}
                      </p>
                      <p className={`text-sm ${
                        scrolled ? "text-gray-400" : "text-slate-400"
                      }`}>
                        View Profile
                      </p>
                    </div>
                  </div>
                  
                  <button className={`w-full flex items-center gap-3 rounded-xl px-4 py-4 text-lg transition-all ${
                    scrolled 
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white" 
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}>
                    <Search size={22} />
                    <span>Search Items</span>
                  </button>
                  
                  <button className={`w-full flex items-center gap-3 rounded-xl px-4 py-4 text-lg transition-all ${
                    scrolled 
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white" 
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}>
                    <Bell size={22} />
                    <span>Notifications</span>
                    <span className="ml-auto w-3 h-3 bg-red-400 rounded-full"></span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4 border-t space-y-3"
                  style={{ borderColor: scrolled ? '#374151' : '#475569' }}
                >
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-4 text-center text-lg font-semibold transition-all ${
                      scrolled
                        ? "text-purple-300 hover:text-white hover:bg-purple-500/20"
                        : "text-cyan-300 hover:text-white hover:bg-cyan-500/20"
                    }`}
                  >
                    Log in
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-4 text-center text-lg font-semibold text-white shadow-lg transition-all ${
                      scrolled
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/30 hover:from-purple-600 hover:to-pink-600"
                        : "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/30 hover:from-cyan-600 hover:to-blue-600"
                    }`}
                  >
                    Create account
                  </NavLink>
                </motion.div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default SiteHeader
