// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { motion } from "framer-motion"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { useState } from "react"
// import { apiClient } from "../../services/api"
// import type { LostFoundFormValues } from "../../types"
// import { useAuth } from "../../providers/AuthProvider"

// const formSchema = z.object({
//   title: z.string().min(3),
//   description: z.string().min(10),
//   location: z.string().min(2),
//   occurredAt: z.string(),
//   imageFile: z.any().optional(),
// })

// type LostItemFormProps = {
//   onSuccess: () => void
// }

// function LostItemForm({ onSuccess }: LostItemFormProps) {
//   const [loading, setLoading] = useState(false)
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       location: "",
//       occurredAt: "",
//     },
//   })
//   const { user } = useAuth()

//   const setImageBase64 = (file?: File) =>
//     new Promise<string | undefined>((resolve, reject) => {
//       if (!file) {
//         resolve(undefined)
//         return
//       }
//       const reader = new FileReader()
//       reader.onload = () => resolve(reader.result as string)
//       reader.onerror = reject
//       reader.readAsDataURL(file)
//     })

//   const onSubmit = handleSubmit(async (values) => {
//     setLoading(true)
//     try {
//       const payload: LostFoundFormValues = {
//         title: values.title,
//         description: values.description,
//         location: values.location,
//         occurredAt: values.occurredAt,
//         image: await setImageBase64((values as any).imageFile?.[0]),
//       }
//       await apiClient.post("/lost", payload)
//       reset()
//       onSuccess()
//     } finally {
//       setLoading(false)
//     }
//   })

//   return (
//     <motion.form
//       onSubmit={onSubmit}
//       initial={{ opacity: 0, y: 24 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.45 }}
//       className="glass-card rounded-[2rem] border border-surface/60 p-6 text-sm text-foreground/70"
//     >
//       <div className="flex items-center justify-between gap-4">
//         <div>
//           <h3 className="font-display text-xl font-semibold text-foreground">Report a lost item</h3>
//           <p className="text-xs text-foreground/60">Share details so other students and the AI feed can assist.</p>
//         </div>
//         <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
//           Logged in as {user?.name ?? "Student"}
//         </span>
//       </div>
//       <div className="mt-5 grid gap-4">
//         <label className="grid gap-1">
//           <span className="text-xs font-semibold text-foreground">Item title</span>
//           <input
//             {...register("title")}
//             placeholder="Lost navy backpack"
//             className="rounded-xl border border-surface/70 bg-white/85 px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
//           />
//           {errors.title && <span className="text-xs text-accent">{errors.title.message}</span>}
//         </label>
//         <label className="grid gap-1">
//           <span className="text-xs font-semibold text-foreground">Description</span>
//           <textarea
//             {...register("description")}
//             placeholder="Contains laptop, notebooks, and student ID. Misplaced near library."
//             rows={3}
//             className="rounded-xl border border-surface/70 bg-white/85 px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
//           />
//           {errors.description && <span className="text-xs text-accent">{errors.description.message}</span>}
//         </label>
//         <div className="grid gap-4 sm:grid-cols-2">
//           <label className="grid gap-1">
//             <span className="text-xs font-semibold text-foreground">Location</span>
//             <input
//               {...register("location")}
//               placeholder="Engineering building foyer"
//               className="rounded-xl border border-surface/70 bg-white/85 px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
//             />
//             {errors.location && <span className="text-xs text-accent">{errors.location.message}</span>}
//           </label>
//           <label className="grid gap-1">
//             <span className="text-xs font-semibold text-foreground">Date &amp; time</span>
//             <input
//               type="datetime-local"
//               {...register("occurredAt")}
//               className="rounded-xl border border-surface/70 bg-white/85 px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
//             />
//             {errors.occurredAt && <span className="text-xs text-accent">{errors.occurredAt.message}</span>}
//           </label>
//         </div>
//         <label className="grid gap-1">
//           <span className="text-xs font-semibold text-foreground">Attach image (optional)</span>
//           <input
//             type="file"
//             accept="image/*"
//             {...register("imageFile")}
//             className="rounded-xl border border-dashed border-surface/70 bg-white/75 px-4 py-3 text-xs text-foreground/60 file:mr-3 file:rounded-full file:border-0 file:bg-primary/15 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-primary hover:border-primary/60"
//           />
//         </label>
//       </div>
//       <div className="mt-5 flex items-center justify-between text-xs text-foreground/60">
//         <p>AI will compare your report with new found submissions immediately.</p>
//         <button
//           type="submit"
//           disabled={loading}
//           className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary/90 disabled:bg-primary/50"
//         >
//           {loading ? "Saving..." : "Submit lost report"}
//         </button>
//       </div>
//     </motion.form>
//   )
// }

// export default LostItemForm




// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { motion } from "framer-motion"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { useState } from "react"
// import { apiClient } from "../../services/api"
// import type { LostFoundFormValues } from "../../types"
// import { useAuth } from "../../providers/AuthProvider"

// const formSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   location: z.string().min(2, "Location is required"),
//   occurredAt: z.string(),
//   imageFile: z.any().optional(),
// })

// type LostItemFormProps = {
//   onSuccess: () => void
// }

// function LostItemForm({ onSuccess }: LostItemFormProps) {
//   const [loading, setLoading] = useState(false)
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       location: "",
//       occurredAt: "",
//     },
//   })
//   const { user } = useAuth()

//   const setImageBase64 = (file?: File) =>
//     new Promise<string | undefined>((resolve, reject) => {
//       if (!file) {
//         resolve(undefined)
//         return
//       }
//       const reader = new FileReader()
//       reader.onload = () => resolve(reader.result as string)
//       reader.onerror = reject
//       reader.readAsDataURL(file)
//     })

//   const onSubmit = handleSubmit(async (values) => {
//     setLoading(true)
//     try {
//       const payload: LostFoundFormValues = {
//         title: values.title,
//         description: values.description,
//         location: values.location,
//         occurredAt: values.occurredAt,
//         image: await setImageBase64((values as any).imageFile?.[0]),
//       }
//       await apiClient.post("/lost", payload)
//       reset()
//       onSuccess()
//     } finally {
//       setLoading(false)
//     }
//   })

//   return (
//     <motion.form
//       onSubmit={onSubmit}
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       whileHover={{ scale: 1.01 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6 }}
//       className="glass-card rounded-3xl border border-black/10 bg-black-200 p-7 shadow-2xl shadow-purple-500/10"
//     >
//       <div className="flex items-center justify-between gap-5 mb-6">
//         <div className="space-y-2">
//           <h3 className="font-display text-2xl font-bold text-white">Report Lost Item</h3>
//           <p className="text-base text-gray-300">
//             Share details so our AI and community can help you find your belongings.
//           </p>
//         </div>
//         <motion.span 
//           whileHover={{ scale: 1.05 }}
//           className="rounded-full bg-purple-600/20 border border-purple-500/40 px-4 py-2 text-sm font-semibold text-purple-300 shadow-lg"
//         >
//           Logged in as {user?.name ?? "Student"}
//         </motion.span>
//       </div>
      
//       <div className="space-y-5">
//         <motion.label className="block space-y-2" whileHover={{ scale: 1.01 }}>
//           <span className="text-base font-semibold text-white">Item Title</span>
//           <input
//             {...register("title")}
//             placeholder="Lost navy backpack, iPhone, wallet..."
//             className="w-full rounded-2xl border border-white/20 bg-gray-800/50 backdrop-blur-lg px-5 py-4 text-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-3 focus:ring-purple-500/20 transition-all duration-300"
//           />
//           {errors.title && <span className="text-red-400 text-sm">{errors.title.message}</span>}
//         </motion.label>

//         <motion.label className="block space-y-2" whileHover={{ scale: 1.01 }}>
//           <span className="text-base font-semibold text-white">Description</span>
//           <textarea
//             {...register("description")}
//             placeholder="Contains laptop, notebooks, and student ID. Last seen near library entrance..."
//             rows={4}
//             className="w-full rounded-2xl border border-white/20 bg-gray-800/50 backdrop-blur-lg px-5 py-4 text-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-3 focus:ring-purple-500/20 transition-all duration-300 resize-none"
//           />
//           {errors.description && <span className="text-red-400 text-sm">{errors.description.message}</span>}
//         </motion.label>

//         <div className="grid gap-5 md:grid-cols-2">
//           <motion.label className="block space-y-2" whileHover={{ scale: 1.01 }}>
//             <span className="text-base font-semibold text-white">Last Known Location</span>
//             <input
//               {...register("location")}
//               placeholder="Engineering building, cafeteria, parking lot..."
//               className="w-full rounded-2xl border border-white/20 bg-gray-800/50 backdrop-blur-lg px-5 py-4 text-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-3 focus:ring-purple-500/20 transition-all duration-300"
//             />
//             {errors.location && <span className="text-red-400 text-sm">{errors.location.message}</span>}
//           </motion.label>

//           <motion.label className="block space-y-2" whileHover={{ scale: 1.01 }}>
//             <span className="text-base font-semibold text-white">Date & Time Lost</span>
//             <input
//               type="datetime-local"
//               {...register("occurredAt")}
//               className="w-full rounded-2xl border border-white/20 bg-gray-800/50 backdrop-blur-lg px-5 py-4 text-lg text-white focus:border-purple-500 focus:outline-none focus:ring-3 focus:ring-purple-500/20 transition-all duration-300"
//             />
//             {errors.occurredAt && <span className="text-red-400 text-sm">{errors.occurredAt.message}</span>}
//           </motion.label>
//         </div>

//         <motion.label className="block space-y-2" whileHover={{ scale: 1.01 }}>
//           <span className="text-base font-semibold text-white">Attach Image (Optional)</span>
//           <input
//             type="file"
//             accept="image/*"
//             {...register("imageFile")}
//             className="w-full rounded-2xl border border-dashed border-white/20 bg-gray-800/50 backdrop-blur-lg px-5 py-4 text-base text-gray-300 file:mr-4 file:rounded-xl file:border-0 file:bg-purple-600/20 file:px-4 file:py-3 file:text-base file:font-semibold file:text-purple-300 hover:border-purple-500/60 transition-all duration-300"
//           />
//         </motion.label>
//       </div>

//       <div className="mt-7 flex items-center justify-between text-base text-gray-300">
//         <p className="max-w-md">AI will continuously scan new found items and notify you of matches.</p>
//         <motion.button
//           type="submit"
//           disabled={loading}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? "Submitting..." : "Submit Lost Report"}
//         </motion.button>
//       </div>
//     </motion.form>
//   )
// }

// export default LostItemForm


"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { apiClient } from "../../services/api"
import type { LostFoundFormValues } from "../../types"
import { useAuth } from "../../providers/AuthProvider"
import { Upload, Camera, MapPin, Calendar, FileText, User } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
  occurredAt: z.string(),
  imageFile: z.any().optional(),
})

type LostItemFormProps = {
  onSuccess: () => void
}

function LostItemForm({ onSuccess }: LostItemFormProps) {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      occurredAt: "",
    },
  })
  const { user } = useAuth()

  const setImageBase64 = (file?: File) =>
    new Promise<string | undefined>((resolve, reject) => {
      if (!file) {
        resolve(undefined)
        return
      }
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true)
    try {
      const payload: LostFoundFormValues = {
        title: values.title,
        description: values.description,
        location: values.location,
        occurredAt: values.occurredAt,
        image: await setImageBase64((values as any).imageFile?.[0]),
      }
      await apiClient.post("/lost", payload)
      reset()
      onSuccess()
    } finally {
      setLoading(false)
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative"
    >
      {/* Background Glow Effect */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 blur transition-all duration-500 group-hover:opacity-100 group-hover:duration-200 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
        initial={false}
      />
      
      <motion.form
        onSubmit={onSubmit}
        whileHover={{ scale: 1.01 }}
        className="relative rounded-3xl bg-gray-800/40 backdrop-blur-xl border border-white/10 p-8 shadow-2xl shadow-purple-500/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-6 mb-8">
          <div className="space-y-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 rounded-2xl bg-purple-500/20 border border-purple-500/30 px-4 py-3"
            >
              <Upload className="text-purple-400" size={24} />
              <h3 className="font-display text-2xl font-bold text-white">Report Lost Item</h3>
            </motion.div>
            <p className="text-lg text-gray-300 max-w-md py-4">
              Share details so our AI and community can help you find your belongings.
            </p>
          </div>
          {/* <motion.span 
            whileHover={{ scale: 1.05 }}
            className="rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 px-4 py-2 text-sm font-semibold text-purple-300 shadow-lg flex items-center gap-2"
          >
            <User size={16} />
            {user?.name ?? "Student"}
          </motion.span> */}
        </div>
        
        {/* Form Fields */}
        <div className="space-y-6">
          {/* Title Field */}
          <motion.div className="space-y-3" whileHover={{ x: 5 }}>
            <label className="flex items-center gap-3 text-lg font-semibold text-white">
              <FileText className="text-purple-400" size={20} />
              Item Title
            </label>
            <input
              {...register("title")}
              placeholder="Lost navy backpack, iPhone, wallet..."
              className="w-full rounded-2xl border border-white/10 bg-gray-800/60 backdrop-blur-lg px-5 py-4 text-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
            {errors.title && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm flex items-center gap-2"
              >
                {errors.title.message}
              </motion.span>
            )}
          </motion.div>

          {/* Description Field */}
          <motion.div className="space-y-3" whileHover={{ x: 5 }}>
            <label className="flex items-center gap-3 text-lg font-semibold text-white">
              <FileText className="text-purple-400" size={20} />
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Contains laptop, notebooks, and student ID. Last seen near library entrance..."
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-gray-800/60 backdrop-blur-lg px-5 py-4 text-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
            />
            {errors.description && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm"
              >
                {errors.description.message}
              </motion.span>
            )}
          </motion.div>

          {/* Location & Date Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Location Field */}
            <motion.div className="space-y-3" whileHover={{ x: 5 }}>
              <label className="flex items-center gap-3 text-lg font-semibold text-white">
                <MapPin className="text-purple-400" size={20} />
                Last Known Location
              </label>
              <input
                {...register("location")}
                placeholder="Engineering building, cafeteria, parking lot..."
                className="w-full rounded-2xl border border-white/10 bg-gray-800/60 backdrop-blur-lg px-5 py-4 text-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
              {errors.location && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm"
                >
                  {errors.location.message}
                </motion.span>
              )}
            </motion.div>

            {/* Date Field */}
            <motion.div className="space-y-3" whileHover={{ x: 5 }}>
              <label className="flex items-center gap-3 text-lg font-semibold text-white">
                <Calendar className="text-purple-400" size={20} />
                Date & Time Lost
              </label>
              <input
                type="datetime-local"
                {...register("occurredAt")}
                className="w-full rounded-2xl border border-white/10 bg-gray-800/60 backdrop-blur-lg px-5 py-4 text-lg text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
              {errors.occurredAt && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm"
                >
                  {errors.occurredAt.message}
                </motion.span>
              )}
            </motion.div>
          </div>

          {/* Image Upload */}
          <motion.div className="space-y-3" whileHover={{ x: 5 }}>
            <label className="flex items-center gap-3 text-lg font-semibold text-white">
              <Camera className="text-purple-400" size={20} />
              Attach Image (Optional)
            </label>
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <input
                type="file"
                accept="image/*"
                {...register("imageFile")}
                className="w-full rounded-2xl border border-dashed border-white/20 bg-gray-800/60 backdrop-blur-lg px-5 py-4 text-base text-gray-300 file:mr-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-purple-500/20 file:to-pink-500/20 file:px-4 file:py-3 file:text-base file:font-semibold file:text-purple-300 hover:border-purple-500/40 transition-all duration-300 cursor-pointer"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          className="mt-8 flex items-center justify-between text-base text-gray-300 pt-6 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="max-w-md text-lg">
            AI will continuously scan new found items and notify you of matches.
          </p>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <Upload size={20} />
            )}
            {loading ? "Submitting..." : "Submit Lost Report"}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  )
}

export default LostItemForm