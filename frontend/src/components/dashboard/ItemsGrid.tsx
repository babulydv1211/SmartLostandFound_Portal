
"use client"
import { motion } from "framer-motion"
import { ShieldCheck, MapPin, Clock, User, Heart, MessageCircle } from "lucide-react"
import type { ItemRecord } from "../../types"

type ItemsGridProps = {
  items: ItemRecord[]
  isLoading: boolean
}

function ItemsGrid({ items, isLoading }: ItemsGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="h-14 w-14 rounded-full border-4 border-purple-500/30 border-t-purple-500"
          />
          <p className="text-lg text-gray-300">Loading live feed...</p>
        </motion.div>
      </div>
    )
  }

  if (!items.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-3xl bg-gray-800/40 backdrop-blur-xl border border-white/10 p-8 shadow-2xl shadow-purple-500/10"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🔍
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            No reports yet
          </h3>
          <p className="text-gray-300 text-lg max-w-md">
            Submit a lost or found report above to get started and help reunite items across campus.
          </p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      {items.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
          className="group relative"
        >
          {/* Background Glow Effect */}
          <motion.div
            className="absolute -inset-1 rounded-3xl opacity-0 blur transition-all duration-500 group-hover:opacity-100 group-hover:duration-200 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
            initial={false}
          />
          
          <motion.article
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="relative rounded-3xl bg-gray-800/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/10 p-6 overflow-hidden"
          >
            {/* Background Gradient Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={false}
            />
            
            {/* Header with Badges */}
            <div className="relative z-10 flex items-center justify-between mb-6">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
                  item.type === "lost" 
                    ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 border border-red-500/30" 
                    : "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30"
                }`}
              >
                {item.type === "lost" ? "🚨 Lost Item" : "🎯 Found Item"}
              </motion.span>
              
              {item.matchConfidence !== undefined && (
                <motion.span 
                  whileHover={{ scale: 1.1 }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-4 py-2 text-sm font-semibold text-purple-300"
                >
                  <ShieldCheck size={16} className="text-purple-400" />
                  {item.matchConfidence.toFixed(0)}% AI Match
                </motion.span>
              )}
            </div>

            {/* Title and Description */}
            <div className="relative z-10 space-y-4 mb-6">
              <motion.h3 
                className="text-2xl font-bold text-white leading-tight"
                whileHover={{ 
                  background: "linear-gradient(to right, #e879f9, #a855f7)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  transition: { duration: 0.3 }
                }}
              >
                {item.title}
              </motion.h3>
              <motion.p 
                className="text-gray-300 leading-relaxed text-base"
                initial={false}
              >
                {item.description}
              </motion.p>
            </div>

            {/* Item Details */}
            <motion.dl 
              className="relative z-10 space-y-4 text-sm mb-6"
              initial={false}
            >
              <motion.div 
                className="flex items-center gap-3 text-gray-300 group/item"
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30"
                >
                  <MapPin size={16} className="text-purple-400" />
                </motion.div>
                <span className="font-medium">Location:</span>
                <span className="text-white">{item.location}</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 text-gray-300 group/item"
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30"
                >
                  <Clock size={16} className="text-blue-400" />
                </motion.div>
                <span className="font-medium">Occurred:</span>
                <span className="text-white">
                  {new Date(item.occurredAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 text-gray-300 group/item"
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className="p-2 rounded-lg bg-pink-500/20 border border-pink-500/30"
                >
                  <User size={16} className="text-pink-400" />
                </motion.div>
                <span className="font-medium">Reporter:</span>
                <span className="text-white">{item.reporterEmail}</span>
              </motion.div>
            </motion.dl>

            {/* Image */}
            {item.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 mt-6 overflow-hidden rounded-2xl"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={`${item.title} preview`}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div 
              className="relative z-10 mt-6 flex items-center gap-3 pt-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-xl bg-gray-700/50 backdrop-blur-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600/50 transition-all duration-300"
              >
                <Heart size={16} />
                Save
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-xl bg-gray-700/50 backdrop-blur-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600/50 transition-all duration-300"
              >
                <MessageCircle size={16} />
                Contact
              </motion.button>
            </motion.div>

            {/* Hover Effect Border */}
            <motion.div
              className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '2px'
              }}
            />
          </motion.article>
        </motion.div>
      ))}
    </div>
  )
}

export default ItemsGrid