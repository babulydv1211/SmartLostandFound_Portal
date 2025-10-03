
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AuthForm from "../components/auth/AuthForm"
import { useAuth } from "../providers/AuthProvider"
import { apiClient } from "../services/api"

function AuthPage() {
  const { login } = useAuth()
  const [isLogin, setIsLogin] = useState(true)

  const slideTransition = { duration: 0.5, ease: "easeInOut" }

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center relative overflow-hidden py-32">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_50%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px]"></div>
        
        {/* Animated Floating Bubbles */}
        <motion.div
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-pink-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-2/3 left-1/3 w-12 h-12 bg-blue-500/20 rounded-full blur-xl"
        />
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-4xl z-10">
        <div className="relative w-full rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-lg p-8 text-white border border-white/10 min-h-[500px] flex shadow-2xl">
          
          {/* Left Side - Enhanced Illustration with Animated Bubble */}
          <div className="hidden md:flex flex-1 flex-col justify-center items-center p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl mr-8 relative overflow-hidden">
            {/* Animated Lost & Found Bubble */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-4 left-8"
            >
              <motion.div
                animate={{ rotate: [0, 0, 0, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
              >
                <span className="text-white font-bold text-sm">🔍 Lost & Found</span>
              </motion.div>
            </motion.div>

            <div className="text-center max-w-xs z-10">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Campus Connect
              </motion.h2>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 mb-6 text-sm leading-relaxed"
              >
                {isLogin 
                  ? "Welcome back! Reconnect with your lost items through our AI-powered matching system."
                  : "Join our campus community to report and recover lost belongings with smart technology."
                }
              </motion.p>
              
              {/* Animated Search Bubble */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                className="relative"
              >
                <div className="w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full flex items-center justify-center relative left-12 top-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-40 h-40 border-2 border-purple-400/30 rounded-full absolute"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-32 bg-gradient-to-br from-purple-300/40 to-pink-300/40 rounded-full flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-4xl"
                    >
                      🔍
                    </motion.div>
                  </motion.div>
                </div>
                
              </motion.div>
            </div>
          </div>

          {/* Right Side - Form with Consistent Styling */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Enhanced Header with Tabs */}
            <div className="flex gap-2 mb-8 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-1 border border-white/10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all relative overflow-hidden ${
                  isLogin 
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg" 
                    : "text-gray-300 hover:text-white bg-transparent"
                }`}
              >
                {isLogin && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Login</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all relative overflow-hidden ${
                  !isLogin 
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg" 
                    : "text-gray-300 hover:text-white bg-transparent"
                }`}
              >
                {!isLogin && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Sign Up</span>
              </motion.button>
            </div>

            {/* Animated Content */}
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={slideTransition}
                  className="flex-1"
                >
                  <motion.h1 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-bold mb-2 text-white"
                  >
                    Welcome Back
                  </motion.h1>
                  <motion.p 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 text-sm text-gray-300"
                  >
                    Sign in to track your lost items and AI matches
                  </motion.p>

                  <AuthForm
                    mode="login"
                    onSubmit={async (values) => {
                      const { data } = await apiClient.post("/auth/login", values)
                      login(data)
                    }}
                    className="space-y-4"
                    inputClassName="bg-gray-800/50 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 rounded-lg px-4 py-3 outline-none placeholder-gray-400 text-white transition w-full backdrop-blur-sm"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={slideTransition}
                  className="flex-1"
                >
                  <motion.h1 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-bold mb-2 text-white"
                  >
                    Create Account
                  </motion.h1>
                  <motion.p 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 text-sm text-gray-300"
                  >
                    Join our campus lost & found community
                  </motion.p>

                  <AuthForm
                    mode="signup"
                    onSubmit={async (values) => {
                      const { data } = await apiClient.post("/auth/signup", values)
                      login(data)
                    }}
                    className="space-y-4"
                    inputClassName="bg-gray-800/50 border border-gray-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 rounded-lg px-4 py-3 outline-none placeholder-gray-400 text-white transition w-full backdrop-blur-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage


