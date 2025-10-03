// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { motion } from "framer-motion"
// import { useForm } from "react-hook-form"
// import { Link } from "react-router-dom"
// import { z } from "zod"
// import { useState } from "react"

// const loginSchema = z.object({
//   email: z.string().email("Use a valid email"),
//   password: z.string().min(8, "Minimum 8 characters"),
// })

// const signupSchema = loginSchema.extend({
//   name: z.string().min(2, "Name is too short"),
// })

// type AuthFormProps = {
//   mode: "login" | "signup"
//   onSubmit: (values: z.infer<typeof signupSchema>) => Promise<void>
// }

// function AuthForm({ mode, onSubmit }: AuthFormProps) {
//   const schema = mode === "signup" ? signupSchema : loginSchema
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   })
//   const [loading, setLoading] = useState(false)
//   const [errorMessage, setErrorMessage] = useState("")

//   const submitHandler = handleSubmit(async (values) => {
//     setLoading(true)
//     setErrorMessage("")
//     try {
//       await onSubmit(values)
//     } catch (error: any) {
//       const message = error.response?.data?.message ?? "Something went wrong. Try again."
//       setErrorMessage(message)
//     } finally {
//       setLoading(false)
//     }
//   })

//   return (
//     <motion.form
//       onSubmit={submitHandler}
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.45 }}
//       className="space-y-5 rounded-3xl border border-surface/60 bg-surface/85 p-6 shadow-lg shadow-primary/10"
//     >
//       <fieldset className="grid gap-4" disabled={loading}>
//         {mode === "signup" && (
//           <div className="space-y-1.5">
//             <label htmlFor="name" className="text-sm font-semibold text-foreground">
//               Full name
//             </label>
//             <input
//               id="name"
//               type="text"
//               placeholder="Priya Sharma"
//               {...register("name")}
//               className="w-full rounded-xl border border-surface/70 bg-white/90 px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
//             />
//             {errors.name && <p className="text-xs text-accent">{errors.name.message}</p>}
//           </div>
//         )}
//         <div className="space-y-1.5">
//           <label htmlFor="email" className="text-sm font-semibold text-foreground">
//             University email
//           </label>
//           <input
//             id="email"
//             type="email"
//             placeholder="you@campus.edu"
//             {...register("email")}
//             className="w-full rounded-xl border border-surface/70 bg-white/90 px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
//           />
//           {errors.email && <p className="text-xs text-accent">{errors.email.message}</p>}
//         </div>
//         <div className="space-y-1.5">
//           <label htmlFor="password" className="text-sm font-semibold text-foreground">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             placeholder="••••••••"
//             {...register("password")}
//             className="w-full rounded-xl border border-surface/70 bg-white/90 px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
//           />
//           {errors.password && <p className="text-xs text-accent">{errors.password.message}</p>}
//         </div>
//       </fieldset>
//       {errorMessage && (
//         <p className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-xs text-accent">{errorMessage}</p>
//       )}
//       <button
//         type="submit"
//         className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/50"
//         disabled={loading}
//       >
//         {loading ? "Processing..." : mode === "signup" ? "Create account" : "Log in"}
//       </button>
//       <p className="text-center text-xs text-foreground/70">
//         {mode === "signup" ? (
//           <>
//             Already have an account?{" "}
//             <Link to="/login" className="text-primary hover:underline">
//               Log in
//             </Link>
//           </>
//         ) : (
//           <>
//             New here?{" "}
//             <Link to="/signup" className="text-primary hover:underline">
//               Create an account
//             </Link>
//           </>
//         )}
//       </p>
//     </motion.form>
//   )
// }

// export default AuthForm



"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"
import { useState } from "react"

const loginSchema = z.object({
  email: z.string().email("Use a valid email"),
  password: z.string().min(8, "Minimum 8 characters"),
})

const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Name is too short"),
})

type AuthFormProps = {
  mode: "login" | "signup"
  onSubmit: (values: z.infer<typeof signupSchema>) => Promise<void>
  className?: string
  inputClassName?: string
  buttonClassName?: string
}

function AuthForm({ mode, onSubmit, className = "", inputClassName = "", buttonClassName = "" }: AuthFormProps) {
  const schema = mode === "signup" ? signupSchema : loginSchema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const submitHandler = handleSubmit(async (values) => {
    setLoading(true)
    setErrorMessage("")
    try {
      await onSubmit(values)
    } catch (error: any) {
      const message = error.response?.data?.message ?? "Something went wrong. Try again."
      setErrorMessage(message)
    } finally {
      setLoading(false)
    }
  })

  return (
    <motion.form
      onSubmit={submitHandler}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`space-y-5 rounded-2xl border border-white/10 bg-gradient-to-br from-gray-800/40 to-gray-900/60 p-6 shadow-2xl backdrop-blur-sm ${className}`}
    >
      <fieldset className="grid gap-4" disabled={loading}>
        {mode === "signup" && (
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-white">
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder=""
              {...register("name")}
              className={`w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/30 ${inputClassName}`}
            />
            {errors.name && <p className="text-xs text-pink-400">{errors.name.message}</p>}
          </div>
        )}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-white">
            University email
          </label>
          <input
            id="email"
            type="email"
            placeholder=""
            {...register("email")}
            className={`w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 ${inputClassName}`}
          />
          {errors.email && <p className="text-xs text-pink-400">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold text-white">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder=""
            {...register("password")}
            className={`w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 ${inputClassName}`}
          />
          {errors.password && <p className="text-xs text-pink-400">{errors.password.message}</p>}
        </div>
      </fieldset>
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
        className={`w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-green-600 hover:to-teal-600 disabled:cursor-not-allowed disabled:opacity-50 ${buttonClassName}`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent"
            />
            Processing...
          </span>
        ) : mode === "signup" ? (
          "Create account"
        ) : (
          "Log in"
        )}
      </motion.button>
      <p className="text-center text-xs text-gray-300">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <Link to="/login" className="text-teal-400 hover:text-teal-300 hover:underline">
              Log in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link to="/signup" className="text-green-400 hover:text-green-300 hover:underline">
              Create an account
            </Link>
          </>
        )}
      </p>
    </motion.form>
  )
}

export default AuthForm