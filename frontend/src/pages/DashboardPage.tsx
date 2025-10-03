


"use client"
import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, LogOut, RefreshCw, Search, Sparkles, Bell, User, MapPin, Clock, ShieldCheck } from "lucide-react"
import LostItemForm from "../components/forms/LostItemForm"
import FoundItemForm from "../components/forms/FoundItemForm"
import ItemsGrid from "../components/dashboard/ItemsGrid"
import TestimonialsCarousel from "../components/dashboard/TestimonialsCarousel"
import { apiClient } from "../services/api"
import type { CommentRecord, ItemRecord } from "../types"
import { useAuth } from "../providers/AuthProvider"

type ItemsResponse = {
  items: ItemRecord[]
}

type CommentsResponse = {
  comments: CommentRecord[]
}

function DashboardPage() {
  const { logout, user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "lost" | "found">("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const {
    data: itemsData,
    refetch,
    isFetching,
  } = useQuery<ItemsResponse>({
    queryKey: ["items"],
    queryFn: async () => {
      const { data } = await apiClient.get("/items")
      return data
    },
  })

  const { data: commentsData } = useQuery<CommentsResponse>({
    queryKey: ["comments"],
    queryFn: async () => {
      const { data } = await apiClient.get("/comments")
      return data
    },
  })

  const filteredItems = useMemo(() => {
    if (!itemsData) return []
    return itemsData.items.filter((item) => {
      const matchesType = filterType === "all" ? true : item.type === filterType
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesType && matchesSearch
    })
  }, [itemsData, filterType, searchTerm])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refetch()
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden py-36">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_50%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px]"></div>
        
        {/* Animated Floating Elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Mouse Follow Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.15), transparent 80%)`
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:px-6">
        {/* Header Section */}
        <motion.section
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="group relative"
>
  {/* Background Glow Effect */}
  <motion.div
    className="absolute -inset-3 rounded-3xl opacity-0 blur-xl transition-all duration-700 group-hover:opacity-100 group-hover:duration-300 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20"
    initial={false}
  />
  
  <div className="relative rounded-3xl bg-gray-800/30 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-purple-500/10 p-8 overflow-hidden">
    {/* Animated Background Elements */}
    <motion.div 
      className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"
      animate={{
        x: [0, 20, 0],
        y: [0, -20, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div 
      className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"
      animate={{
        x: [0, -15, 0],
        y: [0, 15, 0],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
    />

    <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] relative z-10">
      {/* Left Content */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-start gap-4"
        >
          {/* <motion.div
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -10, 10, 0],
              transition: { duration: 0.6 }
            }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl shadow-purple-500/30"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles size={32} className="text-white" />
            </motion.div>
          </motion.div> */}
          <div className="space-y-3">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base font-semibold text-purple-300/90 drop-shadow-lg bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"
            >
              Welcome back, {user?.name ?? "Student"} 
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display text-4xl font-bold text-white drop-shadow-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Live Reports &{" "}
              <motion.span
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                AI Matches
              </motion.span>
            </motion.h1>
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-200/90 leading-relaxed max-w-2xl drop-shadow-lg"
        >
          Submit fresh reports, review the feed, and let our AI suggestions guide reunions across campus.
        </motion.p>

        {/* Stats Row */}
        <motion.div 
          className="flex gap-6 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 rounded-2xl bg-gray-800/40 backdrop-blur-lg border border-white/10 px-4 py-2"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-300">Live Updates</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 rounded-2xl bg-gray-800/40 backdrop-blur-lg border border-white/10 px-4 py-2"
          >
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm text-gray-300">AI Powered</span>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Right Actions Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-6 rounded-2xl bg-gray-800/40 backdrop-blur-xl border border-white/10 p-6 shadow-2xl shadow-purple-500/10"
      >
        <div className="flex items-center justify-between">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="font-semibold text-white text-lg drop-shadow-lg bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-transparent"
          >
            Quick Actions
          </motion.span>
          <motion.button
            whileHover={{ 
              scale: 1.08,
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              borderColor: "rgba(239, 68, 68, 0.5)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.92 }}
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300/90 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 backdrop-blur-sm"
          >
            <LogOut size={16} />
            Log out
          </motion.button>
        </div>
        
        <motion.button
          whileHover={{ 
            scale: 1.05,
            background: "linear-gradient(to right, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4))",
            boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.4)",
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/40 px-5 py-4 text-base font-semibold text-purple-100 transition-all duration-300 hover:shadow-xl backdrop-blur-sm group/refresh"
        >
          <motion.div
            animate={{ 
              rotate: isRefreshing ? 360 : 0,
              transition: { 
                duration: 1, 
                repeat: isRefreshing ? Infinity : 0,
                ease: "linear"
              }
            }}
          >
            <RefreshCw size={20} className="text-purple-300" />
          </motion.div>
          <span>Refresh Feed</span>
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="w-2 h-2 rounded-full bg-purple-400"
          />
        </motion.button>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="w-2 h-2 rounded-full bg-green-400 mt-1.5"
          />
          <p className="text-sm text-gray-300/90 leading-relaxed">
            Match notifications with <span className="text-green-300 font-semibold">confidence ≥ 80%</span> are emailed automatically.
          </p>
        </motion.div>
      </motion.div>
    </div>

    {/* Bottom Border Animation */}
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1, delay: 0.8 }}
    />
  </div>
</motion.section>

        {/* Forms Section */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-8 lg:grid-cols-2 mt-24"
        >
          <LostItemForm onSuccess={() => refetch()} />
          <FoundItemForm onSuccess={() => refetch()} />
        </motion.section>

        {/* Live Feed Section */}
       <motion.section
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="group relative"
>
  {/* Background Glow Effect */}
  <motion.div
    className="absolute -inset-3 rounded-3xl opacity-0 blur-xl transition-all duration-700 group-hover:opacity-100 group-hover:duration-300 bg-gradient-to-r from-emerald-500/15 via-cyan-500/15 to-blue-500/15"
    initial={false}
  />
  
  <div className="relative rounded-3xl bg-gray-900/20 backdrop-blur-2xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/5 p-8 overflow-hidden mt-24">
    {/* Animated Background Elements */}
    <motion.div 
      className="absolute top-6 right-10 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-2xl"
      animate={{
        x: [0, 12, 0],
        y: [0, -12, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div 
      className="absolute bottom-6 left-10 w-20 h-20 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"
      animate={{
        x: [0, -8, 0],
        y: [0, 8, 0],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />

    {/* Header Section */}
    <div className="flex flex-col gap-8 border-b border-emerald-500/20 pb-8 md:flex-row md:items-center md:justify-between relative z-10 ">
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          {/* <motion.div
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -8, 8, 0],
              transition: { duration: 0.5 }
            }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-cyan-600 shadow-2xl shadow-emerald-500/30"
          >
            <motion.div
              animate={{
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Search size={26} className="text-white" />
            </motion.div>
          </motion.div> */}
          <div className="space-y-3">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl font-bold text-white drop-shadow-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
            >
              Live Campus Feed
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base text-gray-200/90 max-w-2xl leading-relaxed"
            >
              Discover lost & found items in real-time. AI-powered matching helps reunite belongings instantly.
            </motion.p>
          </div>
        </motion.div>

        {/* Status Indicators */}
        <motion.div 
          className="flex gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 rounded-2xl bg-emerald-500/10 backdrop-blur-lg border border-emerald-500/20 px-4 py-2"
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-400"
            />
            <span className="text-sm text-emerald-300 font-medium">Live Updates</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 rounded-2xl bg-cyan-500/10 backdrop-blur-lg border border-cyan-500/20 px-4 py-2"
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                transition: { duration: 2, repeat: Infinity, delay: 0.5 }
              }}
              className="w-2 h-2 rounded-full bg-cyan-400"
            />
            <span className="text-sm text-cyan-300 font-medium">AI Active</span>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Controls Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-start"
      >
        {/* Search Input */}
        <motion.div 
          className="relative group/search"
          whileHover={{ scale: 1.02 }}
        >
          {/* Search Glow */}
          <motion.div
            className="absolute -inset-1 rounded-2xl opacity-0 blur transition-all duration-500 group-hover/search:opacity-100 group-hover/search:duration-200 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20"
            initial={false}
          />
          <label className="relative flex w-full items-center gap-3 rounded-2xl bg-gray-800/40 backdrop-blur-lg border border-emerald-500/30 px-5 py-4 text-base text-gray-200 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 sm:w-80">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-emerald-400"
            >
              <Search size={20} />
            </motion.div>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search items, locations, descriptions..."
              className="w-full bg-transparent text-white placeholder-gray-400 text-base focus:outline-none"
            />
            {searchTerm && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setSearchTerm('')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </motion.button>
            )}
          </label>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="relative group/filter"
          whileHover={{ scale: 1.02 }}
        >
          {/* Filter Glow */}
          <motion.div
            className="absolute -inset-1 rounded-2xl opacity-0 blur transition-all duration-500 group-hover/filter:opacity-100 group-hover/filter:duration-200 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
            initial={false}
          />
          <div className="relative flex rounded-2xl bg-gray-800/40 backdrop-blur-lg border border-cyan-500/30 p-2 text-sm font-semibold">
            {(["all", "lost", "found"] as const).map((entry) => (
              <motion.button
                key={entry}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterType(entry)}
                className={`relative rounded-xl px-5 py-3 transition-all duration-300 ${
                  filterType === entry 
                    ? "text-white shadow-lg" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {filterType === entry && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {entry === "all" ? "All" : entry === "lost" ? "Lost" : "Found"}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>

    {/* Items Grid */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="relative z-10"
    >
      <ItemsGrid items={filteredItems} isLoading={isFetching && !itemsData} />
    </motion.div>

    {/* Bottom Status Bar */}
    <motion.div 
      className="flex items-center justify-between pt-6 border-t border-emerald-500/20 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <motion.div 
        className="flex items-center gap-3"
        whileHover={{ x: 5 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            transition: { duration: 2, repeat: Infinity }
          }}
          className="w-2 h-2 rounded-full bg-emerald-400"
        />
        <span className="text-sm text-gray-300">
          Displaying <span className="text-emerald-300 font-semibold">{filteredItems.length}</span> items
          {searchTerm && (
            <span> for "<span className="text-cyan-300">{searchTerm}</span>"</span>
          )}
        </span>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-2 text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onClick={handleRefresh}
      >
        <motion.div
          animate={{ 
            rotate: isRefreshing ? 360 : 0,
            transition: { 
              duration: 1, 
              repeat: isRefreshing ? Infinity : 0,
              ease: "linear"
            }
          }}
        >
          <RefreshCw size={16} />
        </motion.div>
        <span className="text-sm">Refresh now</span>
      </motion.div>
    </motion.div>

    {/* Animated Border */}
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1, delay: 1 }}
    />
  </div>
</motion.section>

        {/* Testimonials Section */}
        {/* <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <TestimonialsCarousel comments={commentsData?.comments ?? []} />
        </motion.section> */}
      </div>
    </div>
  )
}

export default DashboardPage