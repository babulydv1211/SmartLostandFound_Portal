// components/auth/AdminLoginForm.jsx
"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useAuth } from "../../providers/AuthProvider"

function AdminLoginForm({ onSuccess }) {
  const { adminLogin } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const submitHandler = handleSubmit(async (data) => {
    setLoading(true)
    setErrorMessage("")
    try {
      await adminLogin(data)
      onSuccess?.()
    } catch (error) {
      setErrorMessage(error.message || "Invalid admin credentials")
    } finally {
      setLoading(false)
    }
  })

  return (
    <motion.form
      onSubmit={submitHandler}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5 rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800/40 to-gray-900/60 p-6 shadow-2xl backdrop-blur-sm"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white">Admin Login</h3>
        <p className="text-gray-400 text-sm mt-2">Restricted Access</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-semibold text-white">
            Admin ID
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter admin ID"
            {...register("username", { required: "Admin ID is required" })}
            className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30"
          />
          {errors.username && <p className="text-xs text-pink-400">{errors.username.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold text-white">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            {...register("password", { required: "Password is required" })}
            className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30"
          />
          {errors.password && <p className="text-xs text-pink-400">{errors.password.message}</p>}
        </div>
      </div>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-lg border border-pink-400/40 bg-pink-400/10 px-4 py-3"
        >
          <p className="text-xs text-pink-400">{errorMessage}</p>
        </motion.div>
      )}

      <motion.button
        type="submit"
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        disabled={loading}
        className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-purple-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent"
            />
            Verifying...
          </span>
        ) : (
          "Login as Admin"
        )}
      </motion.button>

      <p className="text-center text-xs text-gray-400">
        Contact system administrator for credentials
      </p>
    </motion.form>
  )
}

export default AdminLoginForm